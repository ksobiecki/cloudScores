import { Component, OnDestroy, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { Room } from '../../../shared/models/room.model';
import { RoomsService } from '../../../shared/services/rooms.service';
import { GameAddComponent } from './game-add/game-add.component';
import { Game } from '../../../shared/models/game.model';

@Component({
  selector: 'app-games',
  templateUrl: './games.template.html',
  styleUrls: ['./games.less'],
})
export class GamesComponent implements OnInit, OnDestroy {
  private gamesSubscription: Subscription;

  currentRoom: Room = null;
  searchText: string = '';
  games = [];
  currentGame = 'Szachy';

  constructor(
    private roomsService: RoomsService,
    private route: ActivatedRoute,
    public dialog: MatDialog,
    public router: Router
  ) {}

  ngOnInit(): void {
    this.currentRoom = this.roomsService.getCurrentRoom(
      this.route.snapshot.params['name']
    );
    this.roomsService.getGamesForRoom(this.currentRoom.name);
    this.gamesSubscription = this.roomsService
      .getGamesForRoomUpdateListener()
      .subscribe((games: Game[]) => (this.games = games));
  }

  ngOnDestroy(): void {
    this.gamesSubscription.unsubscribe();
  }

  openDialog() {
    console.log('current room' + this.currentRoom.name);
    const dialogRef = this.dialog.open(GameAddComponent, {
      data: { currentRoom: this.currentRoom.name },
    });
  }

  //for debuging until add game functionality is ready
  // openDialog() {
  //   this.router.navigate([this.currentRoom.name, this.currentGame]);
}
