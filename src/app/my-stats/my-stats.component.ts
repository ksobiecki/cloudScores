import { Component } from '@angular/core';
import { faMedal } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-my-stats',
  templateUrl: './my-stats.template.html',
  styleUrls: ['./my-stats.less'],
})
export class MyStatsComponent {
  faMedal = faMedal;
}
