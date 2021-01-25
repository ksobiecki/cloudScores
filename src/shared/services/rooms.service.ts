import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { Game } from '../models/game.model';
import { Room } from '../models/room.model';
import { Match } from '../models/match.model'
import { HttpClient } from '@angular/common/http';
import { LoginService } from './login.service';

@Injectable({ providedIn: 'root' })
export class RoomsService {
  private roomsUpdated = new Subject<Room[]>();
  private gamesUpdated = new Subject<Game[]>();
  private matchesUpdated = new Subject<Match[]>();
  private allRoomsUpdated = new Subject<Room[]>();
  private gamesAllUpdated = new Subject<Game[]>();
  private allMatchesUpdated = new Subject<Match[]>();
  games: Game[];
  rooms: Room[];
  matches: Match[];
  allGames: Game[];
  allRooms: Room[];
  allMatches: Match[];
  currentRoom = null;

  constructor(private http: HttpClient, public loginService: LoginService) {
    this.getAllRooms();
    this.getAllGames();
  }

  // ---ROOMS---

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
        { players: username },
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

  getRoomByCode(code: String) {
    for (let room of this.allRooms) {
      if (room.code.localeCompare(code.toString()) == 0) return room;
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
        this.allGames = postData.games;
        this.gamesAllUpdated.next([...this.allGames]);
      });
  }

  getAllGamesUpdateListener() {
    return this.gamesAllUpdated.asObservable();
  }

  deleteRoom(roomName: string){
    this.http.delete('http://localhost:3000/api/rooms/' + roomName)
    .subscribe(() => {
      console.log('Deleted!');
    });
  }

  leaveRoom(roomName: string, username: string){
    this.http.post('http://localhost:3000/api/rooms/user/leave/' + username, {roomName: roomName}
    ).subscribe(() => {
      console.log('Successful leave');
    })
  }

  getGamesForRoom(name: string) {
    this.http
      .get<{ message: string; games: Game[] }>(
        'http://localhost:3000/api/rooms/' + name + '/games'
      )
      .subscribe((postData: any) => {
        this.games = postData.games[0].games;
        this.gamesUpdated.next([...this.games]);
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
                console.log(responseData.message);
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

  addUserToRoom(code: string) {
    let newUser = this.loginService.getUsername();
    let room = this.getRoomByCode(code);
    console.log(room.code);
    this.http
      .put<{ message: string }>('http://localhost:3000/api/rooms/' + code, {
        room,
        newUser,
      })
      .subscribe((responseData) => {
        console.log(responseData.message);
        room.players.push(newUser);
      });
  }

  getMatchesForRoom(roomName: string, gameName: string) { //gets all matches for chosen game in chosen room
    this.http.get<{ message: string, matches: Match[]}>(
      'http://localhost:3000/api/matches/' + roomName + "/" + gameName
    )
    .subscribe((responseData) => {
      console.log(responseData.message);
      console.log(responseData.matches);
      this.matches = responseData.matches;
      this.matchesUpdated.next([...this.matches]);
    })
  }

  addMatchToRoom(room: Room, game: Game, match: Match){
    this.http.put<{ message: string }>(
      'http://localhost:3000/api/rooms/' + room.name + '/' + game.name, {
        match:match
      })
    .subscribe((responseData) =>{
        console.log( responseData.message);
        room.matches.push(match);
        this.matchesUpdated.next([...room.matches]);
    })
  }
}
