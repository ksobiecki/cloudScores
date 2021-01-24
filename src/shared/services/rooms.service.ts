import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { Game } from '../models/game.model';
import { Room } from '../models/room.model';
import { HttpClient } from '@angular/common/http';
import { LoginService } from './login.service';

@Injectable({ providedIn: 'root' })
export class RoomsService {
  private roomsUpdated = new Subject<Room[]>();
  private gamesUpdated = new Subject<Game[]>();
  private gamesAllUpdated = new Subject<Game[]>();
  rooms: Room[];
  allGames: Game[];

  constructor(private http: HttpClient, public loginService: LoginService) {}

  // ---ROOMS---

  getAllRooms() {
    this.http
      .get<{ message: string; rooms: Room[] }>(
        'http://localhost:3000/api/rooms'
      )
      .subscribe((postData) => {
        this.rooms = postData.rooms;
        this.roomsUpdated.next([...this.rooms]);
      });
  }

  getRooms() {
    let username = this.loginService.getUsername();
    this.http
      .post<{ message: string }>(
        'http://localhost:3000/api/rooms/user',
        { author: username },
        {
          observe: 'body',
          responseType: 'json',
        }
      )
      .subscribe((postData: any) => {
        console.log(postData);
        this.rooms = postData.rooms;
        this.roomsUpdated.next([...this.rooms]);
      });
  }

  getRoom(name: string) {
    for (let room of this.rooms) {
      if (room.name === name) return room;
    }
  }

  getRoomsUpdateListener() {
    return this.roomsUpdated.asObservable();
  }

  addRoom(room: Room) {
    let username = this.loginService.getUsername();
    this.http
      .post<{ message: string }>('http://localhost:3000/api/rooms', {
        room,
        author: username,
      })
      .subscribe((responseData: any) => {
        console.log(responseData);
        this.rooms.push(responseData.room);
        this.roomsUpdated.next([...this.rooms]);
      });
  }

  // ---GAMES---

  getAllGames() {
    this.http
      .get<{ message: string; rooms: Room[] }>(
        'http://localhost:3000/api/games'
      )
      .subscribe((postData: any) => {
        console.log(postData.games);
        this.allGames = postData.games;
        this.gamesAllUpdated.next([...this.allGames]);
      });
  }

  getAllGamesUpdateListener() {
    return this.gamesAllUpdated.asObservable();
  }

  getGamesForRoom(name: string) {
    this.http
      .post<{ message: string }>(
        'http://localhost:3000/api/rooms/user',
        { room: name },
        {
          observe: 'body',
          responseType: 'json',
        }
      )
      .subscribe((postData: any) => {
        console.log(postData);
        this.rooms = postData.rooms;
        this.roomsUpdated.next([...this.rooms]);
      });

    this.http
    .get<{ message: string, games: Game[] }> (
      'http://localhost:3000/api/games/user'
    ).subscribe((postData: any) => {
      console.log(postData.games);
      this.allGames = postData.games;
      this.gamesAllUpdated.next([...this.allGames]);
    });
  }

  getGamesForRoomUpdateListener() {
    return this.gamesUpdated.asObservable();
  }

  addGame(currentRoom: Room, game: Game) {
    for (let room of this.rooms) {
      if (room === currentRoom) {
        this.http
          .post<{ message: string }>('http://localhost:3000/api/games', game)
          .subscribe((responseData) => {
            console.log(responseData.message);
            room.games.push(game);
            //console.log(room.games.length);
            this.gamesUpdated.next([...room.games]);
          });
      }
    }
  }

  deleteRoom(postId: string) {
    this.http
      .delete('http://localhost:3000/api/rooms/' + postId)
      .subscribe(() => {
        console.log('Deleted!');
      });
  }
}
