import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { Room } from './room/room.model';
import {HttpClient} from '@angular/common/http';
@Injectable({ providedIn: 'root' })
export class RoomsService {
  private roomsUpdated = new Subject<Room[]>();
  rooms: Room[] = [
    {
      id: 1,
      name: 'Room1',
      author: 'Krzyś',
      games: [
        {
          id: 1,
          name: 'Kalambury',
          imgUrl:
            'https://files.rebel.pl/products/100/1437/_107584/gra-imprezowa-mdr-gierki-malzenskie-kalambury-pudelko-1200x900-ffffff.png',
        },
      ],
    },
    { id: 2, name: 'Room2', author: 'Piter', games: [] },
    { id: 3, name: 'Room3', author: 'Pyć', games: [] },
  ];
  constructor(private http:HttpClient){}
  getRooms(){
      this.http.get<{message: string, rooms: Room[]}>('http://localhost:3000/api/rooms').subscribe((postData) => {
        this.rooms = postData.rooms
        this.roomsUpdated.next([...this.rooms]);
      });
  }
  getRoom(name: string) {
    for (let room of this.rooms) {
      if (room.name === name) return room;
    }
  }

  /*getRooms() {
    return [...this.rooms];
  }*/

  getRoomsUpdateListener() {
    return this.roomsUpdated.asObservable();
  }

  addRoom(room: Room) {
    this.http.post<{message: string}>('http://localhost:3000/api/rooms', room)
      .subscribe((responseData) => {
        console.log(responseData.message);
        this.rooms.push(room);
        this.roomsUpdated.next([...this.rooms]);
      });

  }

  getGames(name: string) {
    for (let room of this.rooms) {
      if (room.name === name) return [...room.games];
    }
  }
}
