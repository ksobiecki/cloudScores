import { Component, Input } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Game } from '../../../../shared/models/game.model';

@Component({
  selector: 'app-game',
  templateUrl: './game.template.html',
  styleUrls: ['./game.less'],
})
export class GameComponent {
  @Input() game: Game;

  constructor(private router: Router, private route: ActivatedRoute) {}

  onGameClick() {
    this.router.navigate([this.game._id], { relativeTo: this.route });
  }
}
