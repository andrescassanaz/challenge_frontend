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

  constructor(private authService: AuthService) { }

  ngOnInit() {
 
  }


  login() {
      this.authService.login(this.user);
  }

}