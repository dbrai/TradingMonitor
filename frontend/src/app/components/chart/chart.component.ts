import { Component, OnInit, Input } from '@angular/core';
import { Chart, ChartConfiguration } from 'chart.js';

@Component({
  selector: 'app-chart',
  templateUrl: './chart.component.html',
  styleUrls: ['./chart.component.css']
})
export class ChartComponent implements OnInit {
  @Input() symbol: string = 'BTCUSDT';
  chart: Chart | undefined;
  data: any[] = [];

  ngOnInit() {
    this.initChart();
    this.mockLiveData(); // Simulate or connect WebSocket
  }

  initChart() {
    const ctx = document.getElementById(this.symbol + '-chart') as HTMLCanvasElement;
    this.chart = new Chart(ctx, {
      type: 'line',
      data: {
        labels: [],
        datasets: [{
          label: this.symbol,
          data: [],
          borderColor: 'green',
          fill: false
        }]
      },
      options: {
        responsive: true,
        animation: false,
        scales: {
          x: { display: true },
          y: { display: true }
        }
      }
    });
  }

  addData(price: number, time: string) {
    if(!this.chart) return;
    this.chart.data.labels?.push(time);
    this.chart.data.datasets[0].data.push(price);
    this.chart.update('none');
  }

  mockLiveData() {
    // Simulate incoming prices every second
    setInterval(() => {
      const price = 30000 + Math.random()*500; // Replace with WS data
      const time = new Date().toLocaleTimeString();
      this.addData(price, time);
    }, 1000);
  }
}

