 import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-backtest',
  templateUrl: './backtest.component.html',
  styleUrls: ['./backtest.component.css']
})
export class BacktestComponent implements OnInit {
  scripts: any[] = [];
  symbol: string = '';
  scriptId: string = '';
  startDate: string = '';
  endDate: string = '';
  result: any = null;

  constructor(private http: HttpClient) {}

  ngOnInit() {
    // Load scripts from backend config
    this.http.get<any[]>('/api/scripts').subscribe(data => this.scripts = data);
  }

  runBacktest() {
    if(!this.symbol || !this.scriptId) return;
    this.http.post('/api/backtest', {
      symbol: this.symbol,
      scriptId: this.scriptId,
      startDate: this.startDate,
      endDate: this.endDate
    }).subscribe(res => this.result = res);
  }
}
