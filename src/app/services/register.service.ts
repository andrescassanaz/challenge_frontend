import { Injectable } from '@angular/core';
import { UserModel } from '../model/user.model';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { QueryResultModel } from '../model/queryresult.model';
import { Router } from '@angular/router';
@Injectable({
  providedIn: 'root'
})
export class RegisterService {

  constructor(private http: HttpClient, private router: Router) { }

  queryResult: QueryResultModel;

  public register(user: UserModel): String {
    let statusCode: string;
    this.http.put(environment.rootEndpoint + '/users', user)
      .subscribe(
        (res) => {  
          this.queryResult = res as QueryResultModel;
          this.router.navigate(['/login']);
          statusCode = "0";
        },
        (error) => {
          statusCode = error.status;
        }
      );

    return statusCode;
  }

}
