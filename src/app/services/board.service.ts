import { Injectable } from '@angular/core';
import { QueryResultModel } from '../model/queryresult.model';
import { RestResponseModel } from '../model/restresponse.model';
import { HttpClient } from "@angular/common/http";
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class BoardService {

  constructor(private http:HttpClient) { }

  public getBoardsByUserWithUpdatedWeather(userId:string): Observable<QueryResultModel>{
    return this.http.post<QueryResultModel>('http://localhost:8080/getBoardsByUserWithUpdatedWeather', {"id":userId});
  }

  
  public addBoard(name: string, userId: string):  Observable<RestResponseModel> {
    return this.http.post<RestResponseModel>('http://localhost:8080/addBoard', {
        "name": name,
        "userDto": {
            "id": userId
        }
    });
}

public getBoardsByUser(userId:string): Observable<QueryResultModel>{
    return this.http.post<QueryResultModel>('http://localhost:8080/getBoardsByUser', {"id":userId});
}

public deleteBoard(boardId:string): Observable<QueryResultModel>{
  return this.http.post<QueryResultModel>('http://localhost:8080/deleteBoard', {"id":boardId});
}
  

public deleteLocationOfBoard(boardId:string,woeid:string): Observable<QueryResultModel>{
  return this.http.post<QueryResultModel>('http://localhost:8080/deleteLocationOfBoard', {"woeid":woeid,"boardId":boardId});
}


}
