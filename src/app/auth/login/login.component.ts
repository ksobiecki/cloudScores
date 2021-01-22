import {Component, Input} from '@angular/core';
import { NgForm } from '@angular/forms';

@Component({
  templateUrl: 'login.component.html',
  styleUrls: ['login.component.less'],
})
export class LoginComponent {
  isLoading = false;

  onLogin(form: NgForm): void {
    console.log(form.value);
  }
}
