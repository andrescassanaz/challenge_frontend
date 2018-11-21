import { Component, OnInit, Input } from '@angular/core';
import { RestResponseModel } from '../../../model/restresponse.model';
import { BoardService } from '../../../services/board.service';
import { ManageTableComponent } from '../manage-table/manage-table.component';

@Component({
  providers: [ManageTableComponent],
  selector: 'app-manage-create-board',
  templateUrl: './manage-create-board.component.html',
  styleUrls: ['./manage-create-board.component.css']
})
export class ManageCreateBoardComponent {


  boardName: string = "";
  restResponse: RestResponseModel;
  showSuccessMessage: boolean = false;
  showErrorMessage: boolean = false;

  constructor(private boardService: BoardService, private manageTableComponent:ManageTableComponent) { }


  public addBoard(): void {
    this.boardService.addBoard(this.boardName, "1").subscribe(res => {
      this.restResponse = res as RestResponseModel;
      if (this.restResponse.responseCode == '200') {
        this.boardName = "";
        this.showSuccessMessage = true;
        this.showErrorMessage = false;
        this.manageTableComponent.getBoardsByUser("1")
      } else {
        this.boardName = "";
        this.showSuccessMessage = false;
        this.showErrorMessage = true;
      }
    })
  }
}