import { Component, OnInit } from '@angular/core';
import { UserModel } from '../../model/user.model';
import { RegisterService } from '../../services/register.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {

private user: UserModel = new UserModel();
  constructor(private registerService: RegisterService) { }

  private usernameEmpty:boolean;
  private passwordEmpty:boolean;

  register() {
    if(this.isValid()){
      this.registerService.register(this.user);
    }
  }

  isValid():boolean{
    let isValid:boolean = true;
    if(this.user.username == undefined){
      this.usernameEmpty = true;
      isValid = false;
    } else{
      this.usernameEmpty = false;
      
    }

    if(this.user.password == undefined){
      this.passwordEmpty = true;
      isValid = false;
    } else{
      this.passwordEmpty = false;
    }

    console.log(isValid);
    return isValid;
  }
}
