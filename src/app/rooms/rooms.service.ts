import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { Room } from './room/room.model';

@Injectable({ providedIn: 'root' })
export class RoomsService {
  private roomsUpdated = new Subject<Room[]>();
  rooms: Room[] = [
    { id: 1111, name: 'Room1', author: 'Krzyś' },
    { id: 2222, name: 'Room2', author: 'Piter' },
    { id: 3333, name: 'Room3', author: 'Pyć' },
  ];

  getRooms() {
    return [...this.rooms];
  }

  getRoomsUpdateListener() {
    return this.roomsUpdated.asObservable();
  }

  addRoom(room: Room) {
    this.rooms.push(room);
    this.roomsUpdated.next([...this.rooms]);
  }
}
