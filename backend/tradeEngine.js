class TradeEngine {
    constructor(portfolio) {
        this.portfolio = portfolio;
    }

    processSignal(signal) {
        if(signal.type === 'BUY' && this.portfolio.canOpenTrade()) {
            const trade = this.portfolio.openTrade({
                symbol: signal.symbol,
                side: 'BUY',
                price: signal.price,
                time: Date.now()
            });
            return { status: 'OPENED', trade };
        }
        // Add SELL or CLOSE logic here if needed
        return { status: 'SKIPPED' };
    }
}

module.exports = TradeEngine;
