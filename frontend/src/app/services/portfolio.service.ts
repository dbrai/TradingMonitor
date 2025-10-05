import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { ApiService } from './api.service';

@Injectable({
  providedIn: 'root'
})
export class PortfolioService {
  private portfolioSource = new BehaviorSubject<any>(null);
  portfolio$ = this.portfolioSource.asObservable();

  constructor(private api: ApiService) {
    this.refreshPortfolio();
    // Poll every 2 seconds
    setInterval(() => this.refreshPortfolio(), 2000);
  }

  private refreshPortfolio() {
    this.api.getPortfolio().subscribe(data => {
      this.portfolioSource.next(data);
    });
  }
}
 
