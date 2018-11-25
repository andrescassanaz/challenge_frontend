import { Component, OnInit } from '@angular/core';
import { RestResponseModel } from '../../model/restresponse.model';
import { BoardService } from '../../services/board.service';

@Component({
  selector: 'app-manage',
  templateUrl: './manage.component.html',
  styleUrls: ['./manage.component.css']
})
export class ManageComponent {

  currentUser:string = "andres";

  boardName: string = "";
  restResponse: RestResponseModel;
  showSuccessMessage:boolean = false;
  showErrorMessage:boolean  = false;

  constructor(private boardService: BoardService) { }


  public addBoard(): void {
    this.boardService.addBoard(this.boardName, this.currentUser).subscribe(res => {
      this.restResponse = res as RestResponseModel;
      if (this.restResponse.responseCode == '200') {
        this.boardName = "";
        this.showSuccessMessage = true;
        this.showErrorMessage = false;
      } else {
        this.boardName = "";
        this.showSuccessMessage = false;
        this.showErrorMessage = true;
      }
    })
  }



}
