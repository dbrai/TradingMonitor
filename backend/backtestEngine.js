const fs = require('fs');

class BacktestEngine {
    static async run(symbol, startDate, endDate, script, portfolio) {
        // For simplicity, use local historical file if exists
        const filePath = `data/${symbol}.json`;
        if(!fs.existsSync(filePath)) return { error: 'No historical data' };

        const candles = JSON.parse(fs.readFileSync(filePath));
        const results = { trades: [], finalBalance: portfolio.balance };

        candles.forEach(candle => {
            const avgVol = candles.slice(-script.SMAperiod).reduce((a,b) => a + b.volume, 0)/script.SMAperiod;
            if(candle.volume > avgVol * script.volumeMultiplier) {
                if(portfolio.canOpenTrade()) {
                    const trade = portfolio.openTrade({symbol, side:'BUY', price: candle.close, time:candle.openTime});
                    results.trades.push(trade);
                }
            }
        });

        results.finalBalance = portfolio.balance + portfolio.freeBalance;
        return results;
    }
}

module.exports = BacktestEngine;
