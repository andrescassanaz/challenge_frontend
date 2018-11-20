import { Component, OnInit } from '@angular/core';
import { BoardCrudService } from '../../../services/board-crud.service';
import { RestResponseModel } from '../../../model/restresponse.model';

@Component({
  selector: 'app-board-crud',
  templateUrl: './board-crud.component.html',
  styleUrls: ['./board-crud.component.css']
})
export class BoardCrudComponent{

  boardName: string = "";
  restResponse: RestResponseModel;
  showSuccessMessage:boolean = false;
  showErrorMessage:boolean  = false;

  constructor(private boardCrudService: BoardCrudService) { }


  public addBoard(): void {
    this.boardCrudService.addBoard(this.boardName, "1").subscribe(res => {
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
