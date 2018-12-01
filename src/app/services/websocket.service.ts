import { Injectable } from '@angular/core';
import { BoardModel } from '../model/board.model';
import { HttpClient } from "@angular/common/http";
import { environment } from '../../environments/environment';
import Stomp from 'stompjs';
import SockJS from 'sockjs-client';
@Injectable({
  providedIn: 'root'
})
export class WebsocketService {

  constructor(private http: HttpClient) { }

  private stompClient;

  public startScheduler(username:string): void {
    this.http.post(environment.rootEndpoint+'/startScheduler', username).subscribe(res =>{});
  }

  public stopScheduler(): void {
    this.http.post(environment.rootEndpoint+'/stopScheduler', {}).subscribe(res =>{});
  }


}
