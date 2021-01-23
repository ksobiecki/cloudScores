import { Component, Input } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { RoomsService } from 'src/shared/services/rooms.service';
import { Game } from '../../../../shared/models/game.model';

@Component({
  selector: 'app-game',
  templateUrl: './game.template.html',
  styleUrls: ['./game.less'],
})
export class GameComponent {
  @Input() game: Game;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private roomsService: RoomsService
  ) {}

  onGameClick() {
    let currentRoom = this.roomsService.getRoom(
      this.route.snapshot.params['name']
    );

    this.router.navigate([currentRoom.name, this.game.name]);
  }
}
