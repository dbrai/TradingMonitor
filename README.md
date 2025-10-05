
---

## **Setup & Run**

### **1. Install Node.js**
Make sure Node.js (v18+) and npm are installed on your system.

### **2. Run TradingMonitor**
1. Extract the folder anywhere.
2. Double-click `start.bat`.
   - Backend will start on **http://localhost:5000**.
   - Frontend Angular app will open automatically at **http://localhost:4200**.

### **3. Backend**
- Configurable via `backend/config.json`.
- Parameters include:
  - `startingBalance`: initial simulated balance.
  - `maxOpenTrades`: max trades allowed at a time.
  - `tradeFraction`: fraction of balance per trade.
  - `leverage`: leverage for simulated trades.
  - `scripts`: array of trading scripts.

- Backend provides API endpoints:
  - `GET /api/portfolio` → returns current portfolio.
  - `GET /api/scripts` → returns available scripts.
  - `POST /api/backtest` → runs backtest.

- WebSocket broadcasts live trades and prices to frontend.

### **4. Frontend**
- Angular components:
  - **DashboardComponent** → manage scripts.
  - **ChartComponent** → live price chart + buy/sell markers.
  - **PortfolioComponent** → shows portfolio, open trades, PnL.
  - **BacktestComponent** → run backtests with start/end date.

- Services:
  - `WebSocketService` → live updates from backend.
  - `ApiService` → REST API calls.
  - `PortfolioService` → shared portfolio state.

- Charts powered by **Chart.js** + **chartjs-plugin-annotation**.

---

## **Usage**

1. Open dashboard at `http://localhost:4200`.
2. Monitor live prices and signals for all scripts.
3. Portfolio panel shows balance, free balance, and open trades.
4. Run backtests to simulate historical trades.
5. Charts display real-time trades with buy/sell markers.

---

## **Extending for Actual Trading**

- You can add broker API integration for real trading.
- Options:
  1. Automated execution via API.
  2. Manual trade based on signals.
  3. Hybrid: monitor signals and auto-execute if enabled.

---

## **Notes**

- Currently, this is a **simulation tool**.
- You can optimize SMA periods, multipliers, and trade parameters manually.
- All trades and PnL are logged and available in the frontend.

---

## **License**

This project is free to use for educational and personal purposes.
 
