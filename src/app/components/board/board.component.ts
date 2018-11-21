import { Component, OnInit } from '@angular/core';
import { BoardModel } from '../../model/board.model';
import { QueryResultModel } from '../../model/queryresult.model';
import { BoardService } from '../../services/board.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-board',
  templateUrl: './board.component.html',
  styleUrls: ['./board.component.css']
})
export class BoardComponent{

  private userBoards: BoardModel[];
  private queryResult:QueryResultModel;

  constructor(private boardService:BoardService) {

    this.getBoardsByUserWithUpdatedWeather("1");

   }

  private getBoardsByUserWithUpdatedWeather(userId:string):void{
    this.boardService.getBoardsByUserWithUpdatedWeather(userId).subscribe(res => {
      this.queryResult = res as QueryResultModel;
      this.userBoards = this.queryResult.queryResponse;
    })
  }

}
