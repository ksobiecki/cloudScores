import {Component} from '@angular/core';
import {NgForm} from '@angular/forms';
import {MatDialog} from '@angular/material/dialog';

@Component({
  selector: 'app-room-join',
  templateUrl: './room-join.template.html',
  styleUrls: ['./room-join.less']
})
export class RoomJoinComponent {
  constructor(private dialog: MatDialog) {}

  onSubmit(form: NgForm): void {}

  closeModal(): void {
    const thisDialogRef = this.dialog.closeAll();
  }
}
