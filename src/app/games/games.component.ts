import { Component } from '@angular/core';

@Component ({
  selector: 'app-games',
  templateUrl: './games.template.html',
  styleUrls: ['./games.less']
})
export class GamesComponent {

  games: number[] = [1,2,3,4,5];

}
