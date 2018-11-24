import { Injectable } from '@angular/core';
import { QueryResultModel } from '../model/queryresult.model';
import { RestResponseModel } from '../model/restresponse.model';
import { HttpClient } from "@angular/common/http";
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';


@Injectable({
  providedIn: 'root'
})
export class BoardService {

  constructor(private http: HttpClient) { }

  public getBoardsByUserWithUpdatedWeather(userId: string): Observable<QueryResultModel> {
    return this.http.get<QueryResultModel>(environment.rootEndpoint + '/boards/' + userId);
  }


  public addBoard(name: string, userId: string): Observable<RestResponseModel> {
    return this.http.put<RestResponseModel>(environment.rootEndpoint + '/boards/', { "name": name, "userDto": { "id": userId } });
  }

  public getBoardsByUser(userId: string): Observable<QueryResultModel> {
    return this.http.get<QueryResultModel>(environment.rootEndpoint + '/boards/' + userId);
  }

  public deleteBoard(boardId: string): Observable<QueryResultModel> {
    return this.http.delete<QueryResultModel>(environment.rootEndpoint+'/boards/'+boardId);
  }





}
