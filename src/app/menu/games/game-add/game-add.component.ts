import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Room } from 'src/app/rooms/room/room.model';
import { RoomsService } from 'src/shared/services/rooms.service';
import { Game } from '../../../../shared/models/game.model';

@Component({
  selector: 'app-game-add',
  templateUrl: './game-add.template.html',
  styleUrls: ['./game-add.less'],
})
export class GameAddComponent {
  constructor(
    private roomsService: RoomsService,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {}

  onSubmit(form: NgForm) {
    const currentRoom: Room = this.roomsService.getRoom(
      this.route.snapshot.params['name']
    );

    console.log(this.route);
    console.log(currentRoom);

    // to do poprawy jak już będzie lista z wyborem gier
    const game: Game = form.value;

    this.roomsService.addGame(currentRoom, game);
  }
}
