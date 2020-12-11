import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Room } from '../rooms/room/room.model';
import { RoomsService } from '../rooms/rooms.service';

@Component({
  selector: 'app-games',
  templateUrl: './games.template.html',
  styleUrls: ['./games.less'],
})
export class GamesComponent implements OnInit {
  currentRoom: Room;
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

  constructor(private roomsService: RoomsService, private route: ActivatedRoute) {}

  ngOnInit(): void {
    this.currentRoom = this.roomsService.getRoom(this.route.snapshot.params['name']);
    this.games = this.roomsService.getGames(this.route.snapshot.params['name']);
  }
}
