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

  currentRoom: Room;
  searchText: string = '';
  games = [];

  constructor(
    private roomsService: RoomsService,
    private route: ActivatedRoute,
    public dialog: MatDialog
  ) {}

  ngOnInit(): void {
    this.currentRoom = this.roomsService.getRoom(
      this.route.snapshot.params['name']
    );
    this.games = this.roomsService.getGames(this.route.snapshot.params['name']);
    this.gamesSubscription = this.roomsService
      .getGamesUpdateListener()
      .subscribe((games: Game[]) => (this.games = games));
  }

  ngOnDestroy(): void {
    this.gamesSubscription.unsubscribe();
  }

  openDialog() {
    const dialogRef = this.dialog.open(GameAddComponent);
  }
}
