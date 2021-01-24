import {Component, Inject, OnInit} from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Room } from 'src/shared/models/room.model';
import { RoomsService } from 'src/shared/services/rooms.service';
import { Game } from '../../../../shared/models/game.model';
import { faTimes } from '@fortawesome/free-solid-svg-icons';
import { MatDialog } from '@angular/material/dialog';
import {MAT_DIALOG_DATA} from '@angular/material/dialog';
import {Subscription} from 'rxjs';

@Component({
  selector: 'app-game-add',
  templateUrl: './game-add.template.html',
  styleUrls: ['./game-add.less'],
})
export class GameAddComponent implements OnInit {
  faClose = faTimes;
  games: Game[] = [];
  gameSubscription: Subscription;
  constructor(
    private roomsService: RoomsService,
    private route: ActivatedRoute,
    private dialog: MatDialog,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {}

  ngOnInit(): void {
    this.roomsService.getAllGames();
    this.gameSubscription = this.roomsService
      .getAllGamesUpdateListener()
      .subscribe((games: Game[]) => (this.games = games));
    const allGames: Game[] = this.roomsService.allGames;
    console.log(allGames);
  }

  onSubmit(form: NgForm) {
    const currentRoom: Room = this.data.currentRoom;
    console.log(currentRoom);
    // this.roomsService.addGame(currentRoom, game);
  }

  closeModal(): void {
    const thisDialogRef = this.dialog.closeAll();
  }
}
