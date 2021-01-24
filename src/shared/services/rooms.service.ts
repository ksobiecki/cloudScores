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
  private allRoomsUpdated = new Subject<Room[]>();
  rooms: Room[];
  allGames: Game[];
  allRooms: Room[];

  constructor(private http: HttpClient, public loginService: LoginService) {
    this.getAllRooms();
  }

  getAllRooms() {
    this.http
      .get<{ message: string; rooms: Room[] }>(
        'http://localhost:3000/api/rooms'
      )
      .subscribe((postData) => {
        this.allRooms = postData.rooms;
        this.allRoomsUpdated.next([...this.allRooms]);
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

  getRoomByCode(code:String){
    console.log("FDEFAASFa");
    for (let room of this.allRooms) {
      if(room.code.localeCompare(code.toString())) return room
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
        'author': username,
      })
      .subscribe((responseData: any) => {
        console.log(responseData);
        this.rooms.push(responseData.room);
        this.roomsUpdated.next([...this.rooms]);
      });
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

  addUserToRoom(code: string){

    let newUser = this.loginService.currentUser;
    let room = this.getRoomByCode(code);
    console.log(room.code);
    this.http.post<{ message: string}>('http://localhost:3000/api/rooms/' + code, {
      room
    }).subscribe((responseData) =>{
      console.log(responseData.message);
      room.players.push(newUser);
      });
  }

  getGamesForRoom(name: string) {
    for (let room of this.rooms) {
      if (room.name === name) return [...room.games];
    }
  }

  getAllGames() {
    this.http
      .get<{ message: string; rooms: Room[] }>(
        'http://localhost:3000/api/games'
      )
      .subscribe((postData: any) => {
        console.log(postData.games);
        this.allGames = postData.games;
      });
  }

  getGamesUpdateListener() {
    return this.gamesUpdated.asObservable();
  }

  deleteRoom(postId: string){
    this.http.delete('http://localhost:3000/api/rooms/' + postId)
    .subscribe(() => {
      console.log('Deleted!');
    });
  }
}
