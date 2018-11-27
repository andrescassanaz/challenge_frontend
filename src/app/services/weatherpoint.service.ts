import { Injectable } from '@angular/core';
import { RestResponseModel } from '../model/restresponse.model';
import { HttpClient } from "@angular/common/http";
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { QueryResultModel } from '../model/queryresult.model';

@Injectable({
  providedIn: 'root'
})
export class WeatherpointService {

  constructor(private http: HttpClient) { }


  public getWeatherPointsByLocation(woeid: String): Observable<QueryResultModel> {
    return this.http.get<QueryResultModel>(environment.rootEndpoint + '/weatherpoints/' + woeid);
  }

  public getWeatherPointsByLocationAndDate(woeid:String, date:String): Observable<QueryResultModel>{
    return this.http.get<QueryResultModel>(environment.rootEndpoint+'/weatherpoints/'+woeid+'/'+date);
}

}
