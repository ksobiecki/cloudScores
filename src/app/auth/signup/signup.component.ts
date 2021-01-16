import {Component} from '@angular/core';
import {NgForm} from '@angular/forms';

@Component({
  templateUrl: 'signup.component.html',
  styleUrls: ['signup.component.less']
})
export class SignupComponent {
  isLoading = false;

  onSignup(form: NgForm): void {
    console.log(form.value);
  }
}