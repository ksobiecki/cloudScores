import {Component, OnInit} from '@angular/core';
import {Game} from '../../shared/models/game.model';
import {RoomsService} from '../../shared/services/rooms.service';
import {ActivatedRoute} from '@angular/router';

@Component({
  selector: 'app-play',
  templateUrl: './play.template.html',
  styleUrls: ['./play.less'],
})
export class PlayComponent implements OnInit {
  currentGame: Game;
  currentGameIcon: string;
  constructor(public roomsService: RoomsService, public route: ActivatedRoute) {
  }
  ngOnInit(): void {
    this.currentGame = this.roomsService.getGame(this.route.snapshot.params['gameName']);
    this.currentGameIcon = '../' + this.currentGame.imgUrl;
  }
}
