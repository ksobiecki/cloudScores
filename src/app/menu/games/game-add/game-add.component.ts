import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Room } from 'src/shared/models/room.model';
import { RoomsService } from 'src/shared/services/rooms.service';
import { Game } from '../../../../shared/models/game.model';
import {faTimes} from '@fortawesome/free-solid-svg-icons';
import {MatDialog} from '@angular/material/dialog';

@Component({
  selector: 'app-game-add',
  templateUrl: './game-add.template.html',
  styleUrls: ['./game-add.less'],
})
export class GameAddComponent {
  faClose = faTimes;
  constructor(
    private roomsService: RoomsService,
    private route: ActivatedRoute,
    private dialog: MatDialog
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
  closeModal(): void {
    const thisDialogRef = this.dialog.closeAll();
  }
}
