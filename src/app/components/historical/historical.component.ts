import { Component, OnInit } from '@angular/core';
import { BoardModel } from '../../model/board.model';
import { BoardService } from '../../services/board.service';
import { LocationService } from '../../services/location.service';
import { WeatherpointService } from '../../services/weatherpoint.service';
import { AuthService } from '../../services/auth.service';


@Component({
  selector: 'app-historical',
  templateUrl: './historical.component.html',
  styleUrls: ['./historical.component.css']
})
export class HistoricalComponent{

  constructor(private boardService: BoardService, private locationService: LocationService, private weatherPointService: WeatherpointService, private authService: AuthService) {
    let user = authService.getUser();
    
    this.getBoardsWithLocationsAndWeatherpoint(user.username);
  }

  private selectedDate = "1543295694858";
  private userBoards: BoardModel[];
  private showSpinner:boolean = true;

  private getBoardsWithLocationsAndWeatherpoint(userId: string): void {
    this.boardService.getBoardsByUser(userId).subscribe(res => {
      this.userBoards = res.queryResponse

      for (let i = 0; i < this.userBoards.length; i++) {
        this.locationService.getLocationsByBoard(this.userBoards[i].id).subscribe(res => {
          this.userBoards[i].locations = res.queryResponse

          for (let x = 0; x < this.userBoards[i].locations.length; x++) {
            this.weatherPointService.getWeatherPointsByLocationAndDate(this.userBoards[i].locations[x].woeid, this.selectedDate).subscribe(res => {
              this.userBoards[i].locations[x].weatherPoints = res.queryResponse
              this.showSpinner = false;
              
            })
          }

        })
      }

    })
  }

}
