import { Component, OnInit } from '@angular/core';
import { BoardModel } from '../../model/board.model';
import { BoardService } from '../../services/board.service';
import { LocationService } from '../../services/location.service';
import { WeatherpointService } from '../../services/weatherpoint.service';
import { AuthService } from '../../services/auth.service';
import { BsDatepickerConfig } from 'ngx-bootstrap/datepicker';


@Component({
  selector: 'app-historical',
  templateUrl: './historical.component.html',
  styleUrls: ['./historical.component.css'],
})
export class HistoricalComponent{

  constructor(private boardService: BoardService, private locationService: LocationService, private weatherPointService: WeatherpointService, private authService: AuthService) {
    let user = authService.getUser();
    
  }
  bsConfig: Partial<BsDatepickerConfig> = Object.assign({}, { containerClass: "theme-default" });
  private selectedDate = new Date();
  private userBoards: BoardModel[];
  private showSpinner:boolean = false;
  private showEmptyResultsMessage:boolean = false;

  private findByDate(){
    this.showSpinner = true;
    let date:number = new Date(this.selectedDate).getTime();
    let user = this.authService.getUser();
    this.getBoardsWithLocationsAndWeatherpoint(user.username, date)
  }

  private getBoardsWithLocationsAndWeatherpoint(userId: string, date: number): void {
    this.boardService.getBoardsByUser(userId).subscribe(res => {
      this.userBoards = res.queryResponse

      if(this.userBoards.length == 0){
        this.showSpinner = false;
      }

      for (let i = 0; i < this.userBoards.length; i++) {
        this.locationService.getLocationsByBoard(this.userBoards[i].id).subscribe(res => {
          this.userBoards[i].locations = res.queryResponse

          if(this.userBoards[i].locations.length == 0){
            this.showSpinner = false;
          }

          for (let x = 0; x < this.userBoards[i].locations.length; x++) {
            this.weatherPointService.getWeatherPointsByLocationAndDate(this.userBoards[i].locations[x].woeid, date).subscribe(res => {
              this.userBoards[i].locations[x].weatherPoints = res.queryResponse
              this.showSpinner = false;
              
            })
          }

        })
      }

    })
  }

}
