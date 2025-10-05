 
const express = require('express');
const fs = require('fs');
const WebSocket = require('ws');
const PortfolioManager = require('./portfolioManager');
const ScriptsManager = require('./scriptsManager');
const TradeEngine = require('./tradeEngine');
const BacktestEngine = require('./backtestEngine');

const app = express();
const PORT = 5000;
app.use(express.json());

const config = JSON.parse(fs.readFileSync('config.json'));
const portfolio = new PortfolioManager(config.startingBalance, config.maxOpenTrades, config.tradeFraction, config.leverage);
const scriptsManager = new ScriptsManager(config.scripts);
const tradeEngine = new TradeEngine(portfolio);

// REST endpoint: get current portfolio
app.get('/api/portfolio', (req, res) => res.json(portfolio.getSummary()));

// REST endpoint: backtest
app.post('/api/backtest', async (req, res) => {
    const { symbol, startDate, endDate, scriptId } = req.body;
    const results = await BacktestEngine.run(symbol, startDate, endDate, scriptsManager.getScript(scriptId), portfolio);
    res.json(results);
});

// Start server
const server = app.listen(PORT, () => console.log(`Backend running on port ${PORT}`));

// WebSocket for frontend updates
const wss = new WebSocket.Server({ server });
wss.on('connection', ws => {
    console.log('Frontend connected');
    ws.send(JSON.stringify({ type: 'portfolio', data: portfolio.getSummary() }));
});

// Start Binance WebSocket for live data
scriptsManager.getAllSymbols().forEach(symbol => {
    const wsUrl = `wss://stream.binance.com:9443/ws/${symbol.toLowerCase()}@kline_1m`;
    const binanceWs = new WebSocket(wsUrl);
    binanceWs.on('message', message => {
        const data = JSON.parse(message);
        const candle = {
            openTime: data.k.t,
            open: parseFloat(data.k.o),
            high: parseFloat(data.k.h),
            low: parseFloat(data.k.l),
            close: parseFloat(data.k.c),
            volume: parseFloat(data.k.v),
            isClosed: data.k.x
        };
        const signals = scriptsManager.checkSignals(symbol, candle);
        signals.forEach(signal => {
            const trade = tradeEngine.processSignal(signal);
            // broadcast to frontend
            wss.clients.forEach(client => {
                if(client.readyState === WebSocket.OPEN) {
                    client.send(JSON.stringify({ type: 'trade', data: trade }));
                }
            });
        });
    });
});
