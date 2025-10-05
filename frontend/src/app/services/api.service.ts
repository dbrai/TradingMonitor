import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(private http: HttpClient) { }

  // Fetch current portfolio from backend
  getPortfolio(): Observable<any> {
    return this.http.get('/api/portfolio');
  }

  // Fetch all scripts from backend config
  getScripts(): Observable<any[]> {
    return this.http.get<any[]>('/api/scripts');
  }

  // Run backtest for a given script
  runBacktest(payload: { symbol: string, scriptId: string, startDate: string, endDate: string }): Observable<any> {
    return this.http.post('/api/backtest', payload);
  }
}
