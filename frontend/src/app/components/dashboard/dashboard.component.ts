import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  scripts: any[] = [];
  constructor(private http: HttpClient) {}

  ngOnInit() {
    this.http.get<any[]>('/api/scripts').subscribe(data => this.scripts = data);
  }
}
