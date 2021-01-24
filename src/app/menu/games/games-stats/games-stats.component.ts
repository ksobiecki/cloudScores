import { Component } from '@angular/core';
import {faMedal, faTimes} from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-games-stats',
  templateUrl: './games-stats.template.html',
  styleUrls: ['./games-stats.less'],
})
export class GamesStatsComponent {
  faMedal = faTimes;
}
