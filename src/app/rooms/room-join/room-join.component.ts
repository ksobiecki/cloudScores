import {Component} from '@angular/core';
import {NgForm} from '@angular/forms';
import {MatDialog} from '@angular/material/dialog';
import {faTimes} from '@fortawesome/free-solid-svg-icons';
import {delay} from 'rxjs/operators';
import { RoomsService } from 'src/shared/services/rooms.service';

@Component({
  selector: 'app-room-join',
  templateUrl: './room-join.template.html',
  styleUrls: ['./room-join.less']
})
export class RoomJoinComponent {
  faClose = faTimes;
  formSubmitted = false;
  constructor(private dialog: MatDialog, private roomsService: RoomsService) {}

  onSubmit(form: NgForm): void {
    const code: string = form.value.id;
    console.log(code);
    this.formSubmitted = true;
    this.roomsService.addUserToRoom(code);
    setTimeout(() => {
      const thisDialogRef = this.dialog.closeAll();
    }, 3000);
  }

  closeModal(): void {
    const thisDialogRef = this.dialog.closeAll();
  }
}
