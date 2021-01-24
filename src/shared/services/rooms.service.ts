import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { Game } from '../models/game.model';
import { Room } from '../models/room.model';
import { HttpClient } from '@angular/common/http';
import { LoginService } from './login.service';
import { ActivatedRoute } from '@angular/router';

@Injectable({ providedIn: 'root' })
export class RoomsService {
  private roomsUpdated = new Subject<Room[]>();
  private gamesUpdated = new Subject<Game[]>();
  private gamesAllUpdated = new Subject<Game[]>();
  rooms: Room[];
  allGames: Game[];
  currentRoom = null;

  constructor(
    private http: HttpClient,
    public loginService: LoginService,
    private route: ActivatedRoute
  ) {
    this.getAllGames();
  }

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
        this.rooms = postData.rooms;
        this.roomsUpdated.next([...this.rooms]);
      });
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
        this.rooms.push(responseData.room);
        this.roomsUpdated.next([...this.rooms]);
      });
  }

  deleteRoom(postId: string) {
    this.http
      .delete('http://localhost:3000/api/rooms/' + postId)
      .subscribe(() => {
        console.log('Deleted!');
      });
  }

  // ---GAMES---

  getAllGames() {
    this.http
      .get<{ message: string; rooms: Room[] }>(
        'http://localhost:3000/api/games'
      )
      .subscribe((postData: any) => {
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
      .get<{ message: string; games: Game[] }>(
        'http://localhost:3000/api/games/user'
      )
      .subscribe((postData: any) => {
        console.log(postData.games);
        this.allGames = postData.games;
        this.gamesAllUpdated.next([...this.allGames]);
      });
  }

  getGamesForRoomUpdateListener() {
    return this.gamesUpdated.asObservable();
  }

  getGame(gameName: string) {
    for (let game of this.allGames) {
      if (game.name === gameName) return game;
    }
  }

  //tu jest chujowe nazewnictwo, czekam na dokonczenie modala
  addGameToRoom(currentRoomName: String, game: Game) {
    for (let room of this.rooms) {
      if (room.name === currentRoomName) {
        for (let gameName of this.allGames) {
          if (gameName.name === game.name) {
            this.http
              .put<{ message: string }>(
                'http://localhost:3000/api/rooms/game',
                { gameName, room }
              )
              .subscribe((responseData) => {
                room.games.push(gameName);
                this.gamesUpdated.next([...room.games]);
              });
          }
        }
      }
    }
  }

  getCurrentRoom(roomName: string) {
    for (let room of this.rooms) {
      if (room.name === roomName) return room;
    }
  }

  getCurrentGame(gameName: string) {
    for (let game of this.allGames) {
      if (game.name === gameName) return game;
    }
    return null;
  }
}
