import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { faTimesCircle } from '@fortawesome/free-solid-svg-icons';
import { LoginService } from 'src/shared/services/login.service';
@Component({
  selector: 'app-auth-confirmation-modal',
  templateUrl: './auth.confirmation-moda.template.html',
  styleUrls: ['./auth-confirmation-modal.less'],
})
export class AuthConfirmationModalComponent {
  faTimesCircle = faTimesCircle;

  constructor(private dialog: MatDialog, private loginService: LoginService) {}

  closeModal(): void {
    const thisDialogRef = this.dialog.closeAll();
  }
}
