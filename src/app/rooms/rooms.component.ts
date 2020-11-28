import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Room } from './room/room.model';

@Component({
  selector: 'app-rooms',
  templateUrl: './rooms.template.html',
  styleUrls: ['./rooms.less'],
})
export class RoomsComponent {
  rooms: Room[] = [
    { id: 1111, name: 'Room1', author: 'Krzyś' },
    { id: 2222, name: 'Room2', author: 'Piter' },
    { id: 3333, name: 'Room3', author: 'Pyć' },
  ];

  onSubmit(form: NgForm) {
    const room: Room = form.value;
    console.log(form.value);
    this.rooms.push(room);
  }

}
