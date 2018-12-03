import { Component, OnInit, OnDestroy } from '@angular/core';
import { BoardModel } from '../../model/board.model';
import { BoardService } from '../../services/board.service';
import { LocationService } from '../../services/location.service';
import { WeatherpointService } from '../../services/weatherpoint.service';
import { AuthService } from '../../services/auth.service';
import { WebsocketService } from '../../services/websocket.service';
import Stomp from 'stompjs';
import SockJS from 'sockjs-client';
import { UserModel } from '../../model/user.model';
import { environment } from '../../../environments/environment';

@Component({
  selector: 'app-board',
  templateUrl: './board.component.html',
  styleUrls: ['./board.component.css']
})
export class BoardComponent implements OnDestroy {

  private userBoards: BoardModel[];
  private showSpinner: boolean = false;
  private showCreateBoardMessage = false;
  private showAddLocationMessage = false;

  private stompClient;
  private user: UserModel;

  constructor(private boardService: BoardService, private locationService: LocationService, private weatherPointService: WeatherpointService, private authService: AuthService, private websocketService: WebsocketService) {
    this.user = authService.getUser();
    this.connectWebSocket();
    this.startScheduler();
  }

  ngOnDestroy() {
    this.disconnectWebSocket();
    this.stopScheduler();
  }

  private getBoardsByUserWithUpdatedWeather(userId: string): void {
    this.boardService.getBoardsByUserWithUpdatedWeather(userId).subscribe(res => {
      this.userBoards = res.queryResponse
    })
  }

  public connectWebSocket(): BoardModel[] {
    let boardmodel: BoardModel[];
    let ws = new SockJS(environment.rootEndpoint + '/socket');
    this.stompClient = Stomp.over(ws);
    let that = this;
    this.stompClient.connect({}, (frame) => {
      that.stompClient.subscribe("/channel", (userBoards) => {
        if (userBoards.body) {
          this.userBoards = JSON.parse(userBoards.body);
        }
      });
    });
    return boardmodel;
  }


  public disconnectWebSocket() {
    if (this.stompClient !== null) {
      this.stompClient.disconnect();
    }
  }

  startScheduler() {
    this.websocketService.startScheduler(this.user.username);
  }

  stopScheduler() {
    this.websocketService.stopScheduler();
  }


}
