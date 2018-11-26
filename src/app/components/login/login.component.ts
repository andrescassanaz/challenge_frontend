import { Component, OnInit } from '@angular/core';
import { UserModel } from '../../model/user.model';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  user: UserModel = new UserModel();
  statusCode: String = "0";

  constructor(private authService: AuthService) { }

  ngOnInit() {

  }


  login() {
    this.statusCode = this.authService.login(this.user);
  }

}