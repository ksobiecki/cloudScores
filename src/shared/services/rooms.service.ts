import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { Game } from '../models/game.model';
import { Room } from '../models/room.model';

@Injectable({ providedIn: 'root' })
export class RoomsService {
  private roomsUpdated = new Subject<Room[]>();
  private gamesUpdated = new Subject<Game[]>();
  rooms: Room[] = [
    {
      id: 1,
      name: 'Room1',
      author: 'Krzyś',
      imgSrc: '../../assets/img/avatar1.png',
      games: [
        {
          id: 1,
          name: 'Kalambury',
          imgUrl:
            'https://files.rebel.pl/products/100/1437/_107584/gra-imprezowa-mdr-gierki-malzenskie-kalambury-pudelko-1200x900-ffffff.png',
        },
      ],
      players: ['Krzyś'],
    },
    { id: 2, name: 'Room2', author: 'Piter', imgSrc: '../../assets/img/avatar11.png', games: [], players: [] },
    { id: 3, name: 'Room3', author: 'Pyć', imgSrc: '../../assets/img/avatar13.png', games: [], players: [] },
  ];

  getRoom(name: string) {
    for (let room of this.rooms) {
      if (room.name === name) return room;
    }
  }

  getRooms() {
    return [...this.rooms];
  }

  getRoomsUpdateListener() {
    return this.roomsUpdated.asObservable();
  }

  addRoom(room: Room) {
    console.log(room);
    this.rooms.push(room);
    this.roomsUpdated.next([...this.rooms]);
  }

  getGames(name: string) {
    for (let room of this.rooms) {
      if (room.name === name) return [...room.games];
    }
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

  getGamesUpdateListener() {
    return this.gamesUpdated.asObservable();
  }
}
