import { Injectable } from '@angular/core';
import { RestResponseModel } from '../model/restresponse.model';
import { HttpClient } from "@angular/common/http";
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class LocationService {

  constructor(private http: HttpClient) { }

  public addLocation(city: string, boardId: string): Observable<RestResponseModel> {
    return this.http.post<RestResponseModel>('http://localhost:8080/addLocation', { "city": city, "boardId": boardId }
    );
  }

}
