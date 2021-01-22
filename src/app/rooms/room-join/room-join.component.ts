import {Component} from '@angular/core';
import {NgForm} from '@angular/forms';
import {MatDialog} from '@angular/material/dialog';
import {faTimes} from '@fortawesome/free-solid-svg-icons';
import {delay} from 'rxjs/operators';

@Component({
  selector: 'app-room-join',
  templateUrl: './room-join.template.html',
  styleUrls: ['./room-join.less']
})
export class RoomJoinComponent {
  faClose = faTimes;
  formSubmitted = false;
  constructor(private dialog: MatDialog) {}

  onSubmit(form: NgForm): void {
    this.formSubmitted = true;
    setTimeout(() => {
      const thisDialogRef = this.dialog.closeAll();
    }, 3000);
  }

  closeModal(): void {
    const thisDialogRef = this.dialog.closeAll();
  }
}
