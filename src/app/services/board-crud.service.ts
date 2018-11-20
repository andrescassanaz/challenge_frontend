import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { RestResponseModel } from '../model/restresponse.model';
import { Observable } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class BoardCrudService {

    constructor(private http: HttpClient) { }


    public addBoard(name: string, userId: string):  Observable<RestResponseModel> {
        return this.http.post<RestResponseModel>('http://localhost:8080/addBoard', {
            "name": name,
            "userDto": {
                "id": userId
            }
        });
    }

}