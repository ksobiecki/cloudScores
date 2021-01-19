import { Component, OnDestroy, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { Room } from '../../rooms/room/room.model';
import { RoomsService } from '../../rooms/rooms.service';
import { GameAddComponent } from './game-add/game-add.component';
import { Game } from '../../../shared/models/game.model';

@Component({
  selector: 'app-games',
  templateUrl: './games.template.html',
  styleUrls: ['./games.less'],
})
export class GamesComponent implements OnInit, OnDestroy {
  currentRoom: Room;
  private gamesSubscription: Subscription;
  games = [
    {
      id: 1,
      name: 'Chińczyk',
    },
    {
      id: 2,
      name: 'Makao',
    },
    {
      id: 3,
      name: 'Wojna',
    },
    {
      id: 4,
      name: 'Casino',
    },
  ];

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
