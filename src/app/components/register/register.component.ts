import { Component, OnInit } from '@angular/core';
import { UserModel } from '../../model/user.model';
import { RegisterService } from '../../services/register.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {

  user: UserModel = new UserModel();
  constructor(private registerService: RegisterService) { }

  register() {
    this.registerService.register(this.user);
  }
}
