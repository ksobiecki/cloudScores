import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import {LoginService} from '../../../shared/services/login.service';
import {Router} from '@angular/router';
import {User} from '../../../shared/models/user.model';

@Component({
  templateUrl: 'signup.component.html',
  styleUrls: ['signup.component.less'],
})
export class SignupComponent {
  isLoading = false;

  constructor(public loginService: LoginService, public router: Router) {
    if(this.loginService.getIsUserLoggedIn() === true){
      router.navigateByUrl('/rooms');
    }
  }

  onSignup(form: NgForm): void {
    console.log(form.value);
    const user: User = form.value;
    const result = this.loginService.createUser(user);
    console.log(result);
    if(result === 0) {
      this.router.navigateByUrl('/');
    }
  }
}
