import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class WebSocketService {
  ws: WebSocket | undefined;
  callbacks: ((msg: any) => void)[] = [];

  connect() {
    if(this.ws) return;
    this.ws = new WebSocket('ws://localhost:5000');
    this.ws.onmessage = (event) => {
      const msg = JSON.parse(event.data);
      this.callbacks.forEach(cb => cb(msg));
    };
    this.ws.onopen = () => console.log('Connected to backend WebSocket');
  }

  disconnect() {
    if(this.ws) this.ws.close();
    this.ws = undefined;
  }

  onMessage(cb: (msg: any) => void) {
    this.callbacks.push(cb);
  }
}
