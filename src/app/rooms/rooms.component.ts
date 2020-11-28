import { Component, OnDestroy, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Subscription } from 'rxjs';
import { Room } from './room/room.model';
import { RoomsService } from './rooms.service';

@Component({
  selector: 'app-rooms',
  templateUrl: './rooms.template.html',
  styleUrls: ['./rooms.less'],
})
export class RoomsComponent implements OnInit, OnDestroy {
  rooms: Room[] = [];
  private roomsSubscription: Subscription;

  constructor(private roomsService: RoomsService) {}

  ngOnInit(): void {
    this.rooms = this.roomsService.getRooms();
    this.roomsSubscription = this.roomsService
      .getRoomsUpdateListener()
      .subscribe((rooms: Room[]) => (this.rooms = rooms));
  }

  ngOnDestroy(): void {
   this.roomsSubscription.unsubscribe();
  }

}
