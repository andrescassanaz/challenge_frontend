import { Component, OnInit } from '@angular/core';
import { BoardModel } from '../../model/board.model';
import { BoardService } from '../../services/board.service';
import { LocationService } from '../../services/location.service';
import { WeatherpointService } from '../../services/weatherpoint.service';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-board',
  templateUrl: './board.component.html',
  styleUrls: ['./board.component.css']
})
export class BoardComponent implements OnInit {

  private userBoards: BoardModel[];
  private showSpinner:boolean = false;
  private showCreateBoardMessage = false;
  private showAddLocationMessage = false;

  constructor(private boardService: BoardService, private locationService: LocationService, private weatherPointService: WeatherpointService, private authService: AuthService) {
    let user = authService.getUser();
    this.getBoardsWithLocationsAndWeatherpoint(user.username);
  }

  ngOnInit() {
  }
  private getBoardsWithLocationsAndWeatherpoint(userId: string): void {
    this.boardService.getBoardsByUser(userId).subscribe(res => {
      this.userBoards = res.queryResponse;

      if(this.userBoards.length == 0){
        this.showSpinner = false;
        this.showCreateBoardMessage = true;
      }

      for (let i = 0; i < this.userBoards.length; i++) {
        this.locationService.getLocationsByBoard(this.userBoards[i].id).subscribe(res => {
          this.userBoards[i].locations = res.queryResponse;
            
          if(this.userBoards[i].locations.length == 0){
            this.showSpinner = false;
            this.showAddLocationMessage = true;
          }

          for (let x = 0; x < this.userBoards[i].locations.length; x++) {
            this.weatherPointService.getWeatherPointsByLocation(this.userBoards[i].locations[x].woeid).subscribe(res => {
              this.userBoards[i].locations[x].weatherPoints = res.queryResponse;
              this.showSpinner = false;
            })
          }

        })
      }

    })
  }

  private getBoardsByUserWithUpdatedWeather(userId: string): void {
    this.boardService.getBoardsByUserWithUpdatedWeather(userId).subscribe(res => {
      this.userBoards = res.queryResponse
    })
  }

}
