import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { Game } from '../models/game.model';
import { Room } from '../models/room.model';
import { HttpClient } from '@angular/common/http';

@Injectable({ providedIn: 'root' })
export class RoomsService {
  private roomsUpdated = new Subject<Room[]>();
  private gamesUpdated = new Subject<Game[]>();
  rooms: Room[];

  constructor(private http: HttpClient) {}
  getRooms() {
    this.http
      .get<{ message: string; rooms: Room[] }>(
        'http://localhost:3000/api/rooms'
      )
      .subscribe((postData) => {
        this.rooms = postData.rooms;
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
    this.http
      .post<{ message: string }>('http://localhost:3000/api/rooms', room)
      .subscribe((responseData) => {
        console.log(responseData.message);
        this.rooms.push(room);
        this.roomsUpdated.next([...this.rooms]);
      });
  }

  addGame(currentRoom: Room, game: Game) {
    for (let room of this.rooms) {
      if (room === currentRoom) {
        room.games.push(game);
        console.log(room.games.length);
        this.gamesUpdated.next([...room.games]);
      }
    }
  }

  getGames(name: string) {
    for (let room of this.rooms) {
      if (room.name === name) return [...room.games];
    }
  }

  getGamesUpdateListener() {
    return this.gamesUpdated.asObservable();
  }
}
