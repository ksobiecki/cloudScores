import { Component, Inject } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Room } from 'src/shared/models/room.model';
import { RoomsService } from 'src/shared/services/rooms.service';
import { Game } from '../../../../shared/models/game.model';
import { faTimes } from '@fortawesome/free-solid-svg-icons';
import { MatDialog } from '@angular/material/dialog';
import {MAT_DIALOG_DATA} from '@angular/material/dialog';

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
    private dialog: MatDialog,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {}

  ngOnInit(): void {
    this.roomsService.getAllGames();
    const allGames: Game[] = this.roomsService.allGames;
    //console.log(allGames);
  }

  onSubmit(form: NgForm) {
    const currentRoom: String = this.data.currentRoom;
    const game: Game = form.value;
    //console.log('current room ' + currentRoom);
    //console.log('game form ' + game.name + ' ' + game.imgUrl + ' ' + game._id);
    this.roomsService.addGameToRoom(currentRoom, game);
  }

  closeModal(): void {
    const thisDialogRef = this.dialog.closeAll();
  }

}
