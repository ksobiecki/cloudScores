import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Game } from 'src/shared/models/game.model';
import { Room } from 'src/shared/models/room.model';
import { RoomsService } from 'src/shared/services/rooms.service';
import { faHandPointRight, faHandPointLeft } from '@fortawesome/free-solid-svg-icons'

@Component({
  selector: 'app-matches',
  templateUrl: './matches.template.html',
  styleUrls: ['./matches.less'],
})
export class MatchesComponent implements OnInit{

  faHandPointRight=faHandPointRight;
  faHandPointLeft=faHandPointLeft;

  currentRoom: Room = null;
  currentGame: Game = null;

  constructor (public roomsService: RoomsService, public route: ActivatedRoute, public router: Router) {}

  ngOnInit(): void {
    this.currentGame = this.roomsService.getCurrentGame(this.route.snapshot.params['gameName']);
    this.currentRoom = this.roomsService.getCurrentRoom(this.route.snapshot.params['name']);
  }

  onMatchStart = () => {
    this.router.navigate([this.currentRoom.name, this.currentGame.name, 'play']);
  }

}
