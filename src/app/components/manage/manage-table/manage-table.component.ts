import { Component, OnInit } from '@angular/core';
import { BoardModel } from '../../../model/board.model';
import { QueryResultModel } from '../../../model/queryresult.model';
import { BoardService } from '../../../services/board.service';
import { RestResponseModel } from '../../../model/restresponse.model';
import { LocationService } from '../../../services/location.service';

@Component({
  selector: 'app-manage-table',
  templateUrl: './manage-table.component.html',
  styleUrls: ['./manage-table.component.css']
})
export class ManageTableComponent implements OnInit {

  boardName: string = "";
  city: string = "";
  selectedBoard: string = "";
  restResponse: RestResponseModel;
  showBoardSuccessMessage: boolean = false;
  showBoardErrorMessage: boolean = false;
  showLocationSuccessMessage: boolean = false;
  showLocationErrorMessage: boolean = false;

  constructor(private boardService: BoardService, private locationService: LocationService) { }


  ngOnInit() {
    this.getBoardsByUser("1");
  }

  private userBoards: BoardModel[];
  private queryResult: QueryResultModel;


  public deleteBoard(id: string): void {
    this.boardService.deleteBoard(id).subscribe(res => {
      this.getBoardsByUser("1");
    })
  }

  public deleteLocationOfBoard(idBoard: string, woeid: string): void {
    console.log(idBoard + " - " + woeid);
    this.boardService.deleteLocationOfBoard(idBoard, woeid).subscribe(res => {
      this.getBoardsByUser("1");
    })
  }

  public getBoardsByUser(userId: string): void {
    this.boardService.getBoardsByUser(userId).subscribe(res => {
      this.queryResult = res as QueryResultModel;
      this.userBoards = this.queryResult.queryResponse;
    })
  }


  public addBoard(): void {
    this.boardService.addBoard(this.boardName, "1").subscribe(res => {
      this.restResponse = res as RestResponseModel;
      if (this.restResponse.responseCode == '200') {
        this.boardName = "";
        this.showBoardSuccessMessage = true;
        this.showBoardErrorMessage = false;
        this.getBoardsByUser("1");
      } else {
        this.boardName = "";
        this.showBoardSuccessMessage = false;
        this.showBoardErrorMessage = true;
      }
    })
  }

  public selectBoard(idBoard: string) {
    console.log("VIENE: " + idBoard);
    this.selectedBoard = idBoard;
    console.log("SE GUARDO: " + this.selectedBoard);
  }

  public addLocation(): void {
    this.locationService.addLocation(this.city, this.selectedBoard).subscribe(res => {
      this.restResponse = res as RestResponseModel;
      if (this.restResponse.responseCode == '200') {
        this.boardName = "";
        this.showLocationSuccessMessage = true;
        this.showLocationErrorMessage = false;
        this.getBoardsByUser("1");
      } else {
        this.boardName = "";
        this.showLocationSuccessMessage = false;
        this.showLocationErrorMessage = true;
      }
    })
  }

}
