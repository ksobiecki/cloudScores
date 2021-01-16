import { Component, Input } from '@angular/core';
import { Game } from './game.model';

@Component ({
  selector: 'app-game',
  templateUrl: './game.template.html',
  styleUrls: ['./game.less']
})
export class GameComponent {

  @Input() game: Game;

}
