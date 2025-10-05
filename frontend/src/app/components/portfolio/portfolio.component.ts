 
import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

interface Trade {
  symbol: string;
  side: string;
  price: number;
  amount: number;
  time: number;
}

@Component({
  selector: 'app-portfolio',
  templateUrl: './portfolio.component.html',
  styleUrls: ['./portfolio.component.css']
})
export class PortfolioComponent implements OnInit {
  balance: number = 0;
  freeBalance: number = 0;
  dailyPnL: number = 0;
  openTrades: Trade[] = [];

  constructor(private http: HttpClient) {}

  ngOnInit() {
    this.fetchPortfolio();
    // Poll every 2 seconds
    setInterval(() => this.fetchPortfolio(), 2000);
  }

  fetchPortfolio() {
    this.http.get<any>('/api/portfolio').subscribe(data => {
      this.balance = data.balance;
      this.freeBalance = data.freeBalance;
      this.dailyPnL = data.dailyPnL;
      this.openTrades = data.openTrades;
    });
  }
}
