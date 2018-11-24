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
  selectedLocation: string = "";
  restResponse: RestResponseModel;
  showBoardSuccessMessage: boolean = false;
  showBoardErrorMessage: boolean = false;
  showLocationSuccessMessage: boolean = false;
  showLocationErrorMessage: boolean = false;

  constructor(private boardService: BoardService, private locationService: LocationService) { }

  currentUser:string = "1";

  ngOnInit() {
    this.getBoardsByUser(this.currentUser);
  }

  private userBoards: BoardModel[];
  private queryResult: QueryResultModel;


  public deleteBoard(id: string): void {
    this.boardService.deleteBoard(id).subscribe(res => {
      this.getBoardsByUser(this.currentUser);
    })
  }

  public deleteLocationOfBoard(idBoard: string, woeid: string): void {
    this.locationService.deleteLocationOfBoard(idBoard, woeid).subscribe(res => {
      this.getBoardsByUser(this.currentUser);
    })
  }

  private getBoardsByUser(userId: string): void {
    this.boardService.getBoardsByUser(userId).subscribe(res => {
      this.userBoards = res.queryResponse

      for (let i = 0; i < this.userBoards.length; i++) {
        this.locationService.getLocationsByBoard(this.userBoards[i].id).subscribe(res => {
          this.userBoards[i].locations = res.queryResponse
        })
      }

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
    this.selectedBoard = idBoard;
  }

  public selectBoardAndLocation(idBoard: string, woeid: string) {
    this.selectedBoard = idBoard;
    this.selectedLocation = woeid;
  }

  public hideMessages() {
    this.showBoardSuccessMessage = false;
    this.showBoardErrorMessage = false;
    this.showLocationSuccessMessage = false;
    this.showLocationErrorMessage = false;
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
