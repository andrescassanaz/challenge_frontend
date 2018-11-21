import { Component, OnInit } from '@angular/core';
import { BoardModel } from '../../../../model/board.model';
import { QueryResultModel } from '../../../../model/queryresult.model';
import { BoardService } from '../../../../services/board.service';

@Component({
  selector: 'app-board-crud-table',
  templateUrl: './board-crud-table.component.html',
  styleUrls: ['./board-crud-table.component.css']
})
export class BoardCrudTableComponent implements OnInit {

  constructor(private boardService: BoardService) { }

  
  ngOnInit() {
    this.getBoardsByUser("1");
  }

  private userBoards: BoardModel[];
  private queryResult: QueryResultModel;


  public deleteBoard(id: string): void {
      this.boardService.deleteBoard(id).subscribe(res => {
      this.queryResult = res as QueryResultModel;
      this.userBoards = this.queryResult.queryResponse;
      console.log(this.userBoards);
    })
  }

  public deleteLocationOfBoard(idBoard: string, woeid: string): void {
    console.log(idBoard + " - " + woeid);
    this.boardService.deleteLocationOfBoard(idBoard, woeid).subscribe(res => {
    this.queryResult = res as QueryResultModel;
    this.userBoards = this.queryResult.queryResponse;
    console.log(this.userBoards);
    this.getBoardsByUser("1");
  })
}

  private getBoardsByUser(userId: string): void {
      this.boardService.getBoardsByUser(userId).subscribe(res => {
      this.queryResult = res as QueryResultModel;
      this.userBoards = this.queryResult.queryResponse;
      console.log(this.userBoards);
    })
  }

}
