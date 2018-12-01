import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { UserModel } from '../model/user.model';
import { Router } from '@angular/router';
import { QueryResultModel } from '../model/queryresult.model';
import { JwtHelperService } from '@auth0/angular-jwt';
import { environment } from '../../environments/environment';
@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http: HttpClient, private router: Router, private jwtHelper: JwtHelperService) {

  }

  queryResult: QueryResultModel;


  public login(user: UserModel): String {
    let statusCode: string;
    this.http.post(environment.rootEndpoint + '/login', user)
      .subscribe(
        (res) => {  
          this.queryResult = res as QueryResultModel;
          user = this.queryResult.queryResponse[0] as UserModel;
          this.setUser(user);
          this.router.navigate(['/home']);
          statusCode = "0";
        },
        (error) => {
          statusCode = error.status;
        }
      );

    return statusCode;
  }

  public logout(): void {
    localStorage.removeItem('user');
    this.router.navigate(['/login']);
  }

  public isAuthenticated(): boolean {
    const token = this.getToken();
    return !this.jwtHelper.isTokenExpired(token);
  }

  public setUser(user: UserModel): void {
    localStorage.setItem('user', JSON.stringify(user));
  }

  public getUser(): UserModel {
    const json = localStorage.getItem('user');
    if (json) {
      return <UserModel>JSON.parse(json);
    }
    return null;
  }

  public getToken(): string {
    const user: UserModel = this.getUser();
    if (user) {
      return user.token;
    }
    return null;
  }

  public refreshToken(headers: HttpHeaders): void {
    const user = this.getUser();
    user.token = headers.get('Authorization');
    this.setUser(user);
  }

}