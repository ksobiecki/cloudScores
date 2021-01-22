import { Component } from '@angular/core';
import { RoomsService } from '../../../shared/services/rooms.service';

import {RoomCreateComponent} from '../room-create/room-create.component';
import {MatDialog} from '@angular/material/dialog';
import {RoomJoinComponent} from '../room-join/room-join.component';
import {faTimes} from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-room-add',
  templateUrl: './room-add.template.html',
  styleUrls: ['./room-add.less'],
})
export class RoomAddComponent {
  faClose = faTimes;

  constructor(private roomsService: RoomsService, public dialog: MatDialog) {}

  openCreateRoom(): void {
    const thisDialogRef = this.dialog.closeAll();
    const dialogRef = this.dialog.open(RoomCreateComponent);
  }

  openJoinRoom(): void {
    const thisDialogRef = this.dialog.closeAll();
    const dialogRef = this.dialog.open(RoomJoinComponent);
  }

  closeModal(): void {
    const thisDialogRef = this.dialog.closeAll();
  }
}
