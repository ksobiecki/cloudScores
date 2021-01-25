import {Component, OnInit} from '@angular/core';
import {faMedal, faTimes} from '@fortawesome/free-solid-svg-icons';
import {Room} from '../../../../shared/models/room.model';
import {RoomsService} from '../../../../shared/services/rooms.service';
import {ActivatedRoute} from '@angular/router';
import {Game} from '../../../../shared/models/game.model';
import { LoginService } from 'src/shared/services/login.service';

@Component({
  selector: 'app-games-stats',
  templateUrl: './games-stats.template.html',
  styleUrls: ['./games-stats.less'],
})
export class GamesStatsComponent implements OnInit {
  currentGame: Game;
  currentGameIcon: string;
  constructor(public roomsService: RoomsService, public route: ActivatedRoute) {
  }

  ngOnInit(): void {
    let currentRoom = this.roomsService.getCurrentRoom(this.route.snapshot.params['name']);
    this.roomsService.getScoreByRoom();
    this.currentGame = this.roomsService.getGame(this.route.snapshot.params['gameName']);
    this.currentGameIcon = '../' + this.currentGame.imgUrl;
  }
}
