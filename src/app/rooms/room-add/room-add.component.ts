import { Component } from '@angular/core';
import { RoomsService } from '../rooms.service';

import {RoomCreateComponent} from '../room-create/room-create.component';
import {MatDialog} from '@angular/material/dialog';

@Component({
  selector: 'app-room-add',
  templateUrl: './room-add.template.html',
  styleUrls: ['./room-add.less']
})
export class RoomAddComponent {

  constructor(private roomsService: RoomsService, public dialog: MatDialog) {}

  openCreateRoom(): void {
    const dialogRef = this.dialog.open(RoomCreateComponent);
  }

}
