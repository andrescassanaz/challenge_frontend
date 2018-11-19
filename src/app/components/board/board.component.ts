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
export class BoardComponent implements OnInit {

  private userBoards: BoardModel[];
  private queryResult:QueryResultModel;

  constructor(private boardService:BoardService) {

    this.getBoardsByUser("1");

   }

  ngOnInit() {
   
  }

  private getBoardsByUser(userId:string):void{
    this.boardService.getBoardsByUser(userId).subscribe(res => {
      this.queryResult = res as QueryResultModel;
      this.userBoards = this.queryResult.queryResponse;
      console.log(this.userBoards);
    })
  }

}
