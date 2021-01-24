import {Component, OnInit} from '@angular/core';
import {faMedal, faTimes} from '@fortawesome/free-solid-svg-icons';
import {Room} from '../../../../shared/models/room.model';
import {RoomsService} from '../../../../shared/services/rooms.service';
import {ActivatedRoute} from '@angular/router';
import {Game} from '../../../../shared/models/game.model';

@Component({
  selector: 'app-games-stats',
  templateUrl: './games-stats.template.html',
  styleUrls: ['./games-stats.less'],
})
export class GamesStatsComponent implements OnInit {
  faMedal = faTimes;
  currentRoom: Room;
  currentGame: Game;
  currentGameIcon: string;
  constructor(public roomsService: RoomsService, public route: ActivatedRoute) {
  }

  ngOnInit(): void {
    this.currentRoom = this.roomsService.getCurrentRoom(this.route.snapshot.params['name']);
    this.currentGame = this.roomsService.getGame(this.route.snapshot.params['gameName']);
    this.currentGameIcon = '../' + this.currentGame.imgUrl;
  }
}
