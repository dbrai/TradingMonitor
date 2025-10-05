 class PortfolioManager {
    constructor(startingBalance, maxOpenTrades, tradeFraction, leverage) {
        this.balance = startingBalance;
        this.freeBalance = startingBalance;
        this.maxOpenTrades = maxOpenTrades;
        this.tradeFraction = tradeFraction;
        this.leverage = leverage;
        this.openTrades = [];
        this.dailyPnL = 0;
    }

    canOpenTrade() {
        return this.openTrades.length < this.maxOpenTrades && this.freeBalance > 0;
    }

    openTrade(trade) {
        const amount = this.freeBalance * this.tradeFraction;
        trade.amount = amount;
        trade.leverage = this.leverage;
        trade.entryBalance = this.balance;
        this.openTrades.push(trade);
        this.freeBalance -= amount;
        return trade;
    }

    closeTrade(trade, pnl) {
        this.balance += pnl;
        this.freeBalance += trade.amount;
        this.dailyPnL += pnl;
        this.openTrades = this.openTrades.filter(t => t !== trade);
    }

    getSummary() {
        return {
            balance: this.balance,
            freeBalance: this.freeBalance,
            openTrades: this.openTrades,
            dailyPnL: this.dailyPnL
        };
    }
}

module.exports = PortfolioManager;

