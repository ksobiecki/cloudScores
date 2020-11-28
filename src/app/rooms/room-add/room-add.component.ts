import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Room } from '../room/room.model';
import { RoomsService } from '../rooms.service';

@Component({
  selector: 'app-room-add',
  templateUrl: './room-add.template.html',
  styleUrls: ['./room-add.less']
})
export class RoomAddComponent {

  constructor(private roomsService: RoomsService) {}

  onSubmit(form: NgForm) {
    const room: Room = form.value;
    this.roomsService.addRoom(room);
  }

}
