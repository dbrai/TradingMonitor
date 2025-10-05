class ScriptsManager {
    constructor(scripts) {
        this.scripts = scripts;
        this.candles = {};
    }

    getAllSymbols() {
        return this.scripts.map(s => s.symbol);
    }

    getScript(id) {
        return this.scripts.find(s => s.id === id);
    }

    checkSignals(symbol, candle) {
        if(!this.candles[symbol]) this.candles[symbol] = [];
        this.candles[symbol].push(candle);

        const signals = [];
        const script = this.scripts.find(s => s.symbol === symbol);
        if(!script) return signals;

        // Simple volume spike logic
        const last10 = this.candles[symbol].slice(-script.SMAperiod);
        const avgVol = last10.reduce((a,b) => a + b.volume, 0)/last10.length;

        if(candle.volume > avgVol * script.volumeMultiplier && candle.isClosed) {
            signals.push({ symbol, type: 'BUY', price: candle.close });
        }

        return signals;
    }
}

module.exports = ScriptsManager;
