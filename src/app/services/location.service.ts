import { Injectable } from '@angular/core';
import { RestResponseModel } from '../model/restresponse.model';
import { HttpClient } from "@angular/common/http";
import { Observable } from 'rxjs';
import { QueryResultModel } from '../model/queryresult.model';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class LocationService {

  constructor(private http: HttpClient) { }

  public addLocation(city: string, boardId: string): Observable<RestResponseModel> {
    return this.http.put<RestResponseModel>(environment.rootEndpoint + '/locations', { "city": city, "boardId": boardId }
    );
  }

  public getLocationsByBoard(boardId: String): Observable<QueryResultModel> {
    return this.http.get<QueryResultModel>(environment.rootEndpoint + '/locations/' + boardId);
  }

  public deleteLocationOfBoard(boardId: string, woeid: string): Observable<QueryResultModel> {
    return this.http.delete<QueryResultModel>(environment.rootEndpoint + '/locations/' + boardId + '/' + woeid);
  }

}
