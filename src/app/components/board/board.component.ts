import { Component, OnInit } from '@angular/core';
import { BoardModel } from '../../model/board.model';
import { QueryResultModel } from '../../model/queryresult.model';
import { BoardService } from '../../services/board.service';
import { Observable } from 'rxjs';
import { LocationService } from '../../services/location.service';
import { WeatherpointService } from '../../services/weatherpoint.service';

@Component({
  selector: 'app-board',
  templateUrl: './board.component.html',
  styleUrls: ['./board.component.css']
})
export class BoardComponent implements OnInit{

  private userBoards: BoardModel[];

  constructor(private boardService: BoardService, private locationService: LocationService, private weatherPointService: WeatherpointService) {

    //this.getBoardsByUserWithUpdatedWeather("1");
    this.getBoardsWithLocationsAndWeatherpoint("1");

  }
 
  ngOnInit() {

    
  }
  private getBoardsWithLocationsAndWeatherpoint(userId: string): void {
    this.boardService.getBoardsByUser(userId).subscribe(res => {
      this.userBoards = res.queryResponse

      for (let i = 0; i < this.userBoards.length; i++) {
        this.locationService.getLocationsByBoard(this.userBoards[i].id).subscribe(res => {
          this.userBoards[i].locations = res.queryResponse

          for (let x = 0; x < this.userBoards[i].locations.length; x++) {
            this.weatherPointService.getWeatherPointsByLocation(this.userBoards[i].locations[x].woeid).subscribe(res => {
              this.userBoards[i].locations[x].weatherPoints = res.queryResponse
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
