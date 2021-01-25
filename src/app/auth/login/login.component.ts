import { Component, Input } from '@angular/core';
import { NgForm } from '@angular/forms';
import { LoginService } from '../../../shared/services/login.service';
import { Router } from '@angular/router';
import { User } from '../../../shared/models/user.model';
import { AuthConfirmationModalComponent } from '../auth-confirmation-modal/auth-confirmation-modal.component';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-login',
  templateUrl: 'login.component.html',
  styleUrls: ['login.component.less'],
})
export class LoginComponent {
  isLoading = false;

  constructor(
    public loginService: LoginService,
    public router: Router,
    public dialog: MatDialog
  ) {
    if(this.loginService.getIsUserLoggedIn()) {
      this.router.navigateByUrl('/rooms');
    }
  }

  onLogin(form: NgForm): void {
    const user: User = form.value;
    this.loginService.login(user).then((data) => {
      if (data === 0) {
        this.router.navigateByUrl('/rooms');
      } else if (data === 1) {
        const dialogRef = this.dialog.open(AuthConfirmationModalComponent);
      }
    });
  }
}
