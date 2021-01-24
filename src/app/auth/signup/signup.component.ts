import { Component } from '@angular/core';
import {FormBuilder, FormGroup, NgForm, Validators} from '@angular/forms';
import {LoginService} from '../../../shared/services/login.service';
import {Router} from '@angular/router';
import {User} from '../../../shared/models/user.model';

@Component({
  selector: 'app-signup',
  templateUrl: 'signup.component.html',
  styleUrls: ['signup.component.less'],
})
export class SignupComponent {
  isLoading = false;
  arePasswordsEqual: boolean;

  constructor(
    public loginService: LoginService,
    public router: Router
    ) {
    if(this.loginService.getIsUserLoggedIn() === true){
      router.navigateByUrl('/rooms');
    }
  }

  onSignup(form: NgForm): void {
    // console.log(form.value);
    const user: User = form.value;
    const result = this.loginService.createUser(user);
    console.log(result);
    if(result === 0) {
      this.router.navigateByUrl('/');
    }
  }

  verifyInput(): void {
    const input = (document.getElementById('passwordInput') as HTMLInputElement).value;
    const upperInput = input.toUpperCase();
    const lowerInput = input.toLowerCase();
    const numbers = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9'];
    let containsNumber = false;
    for (const num of numbers) {
      if (input.indexOf(num) >= 0) {
        containsNumber = true;
      }
    }
    const error = document.getElementById('passwordError');
    if(input.length < 8) {
      error.innerHTML = 'Password must be at least 8 characters long';
    }
    else if(lowerInput === input) {
      error.innerHTML = 'Password must contain at least one upper case character';
    }
    else if(upperInput === input) {
      error.innerHTML = 'Password must contain at least one lower case character';
    }
    else if(!containsNumber) {
      error.innerHTML = 'Password must contain at least one number';
    }
  }
}
