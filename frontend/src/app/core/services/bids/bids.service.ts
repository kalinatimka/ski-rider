import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { io, Socket } from 'socket.io-client';
import { LOCAL_URL } from 'src/app-config/routes/path.config';
import { LotModel } from '../../models/lot.model';

@Injectable({
  providedIn: 'root'
})
export class BidsService {
  private socket: Socket;

  constructor() {
    this.socket = io(LOCAL_URL, {
      transports: [
        'websocket',
        'pulling',
        'flashsocket',
      ]
    });
  }

  public joinAuction(lot: LotModel): void {
    this.socket.emit('join-auction', lot);
  }

  public makeBid(bid: object): void {
    this.socket.emit('makeBid', bid);
  }

  public getBid(): Observable<object> {
    return new Observable<object>(observer => {
      this.socket.on('getBid', (data: object) => {
        observer.next(data);
      });

      return () => {
        this.socket.disconnect();
      }
    })
  }
}
