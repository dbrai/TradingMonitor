import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppComponent } from './app.component';

import { DashboardComponent } from './components/dashboard/dashboard.component';
import { ChartComponent } from './components/chart/chart.component';
import { PortfolioComponent } from './components/portfolio/portfolio.component';
import { BacktestComponent } from './components/backtest/backtest.component';

import { HttpClientModule } from '@angular/common/http';
import { NgChartsModule } from 'ng2-charts';

@NgModule({
  declarations: [
    AppComponent,
    DashboardComponent,
    ChartComponent,
    PortfolioComponent,
    BacktestComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    NgChartsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
