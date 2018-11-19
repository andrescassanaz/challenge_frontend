import { Injectable } from '@angular/core';
import { BoardModel } from '../model/board.model';
import { QueryResultModel } from '../model/queryresult.model';
import { HttpClient } from "@angular/common/http"
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class BoardService {

  constructor(private http:HttpClient) { }

  public getBoardsByUser(userId:string): Observable<QueryResultModel>{
    return this.http.post<QueryResultModel>('http://localhost:8080/getBoardsByUser', {"id":userId});
  }



}
