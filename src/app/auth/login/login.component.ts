import {Component, Input} from '@angular/core';
import { NgForm } from '@angular/forms';
import {LoginService} from '../../../shared/services/login.service';
import {Router} from '@angular/router';
import {User} from '../../../shared/models/user.model';

@Component({
  selector: 'app-login',
  templateUrl: 'login.component.html',
  styleUrls: ['login.component.less'],
})
export class LoginComponent {
  isLoading = false;

  constructor(public loginService: LoginService, public router: Router) {
    if(this.loginService.getIsUserLoggedIn() === true){
      router.navigateByUrl('/rooms');
    }
  }

 onLogin(form: NgForm): void {
    // const email = form.value.email;
    // const password = form.value.password;
    const user: User = form.value;
    console.log(form.value);
    this.loginService.login(user).then( data => {
      if(data === 0) {
        this.router.navigateByUrl('/rooms');
      }
    })
    
  }
}
