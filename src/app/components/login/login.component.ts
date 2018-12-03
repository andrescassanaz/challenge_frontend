import { Component, OnInit } from '@angular/core';
import { UserModel } from '../../model/user.model';
import { AuthService } from '../../services/auth.service';
import { RestResponseModel } from '../../model/restresponse.model';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

  user: UserModel = new UserModel();
  statusCode: String = "0";

  constructor(private authService: AuthService, private router: Router) { }


  login() {
    this.authService.login(this.user);
  }



}