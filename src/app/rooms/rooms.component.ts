import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { Room } from '../../shared/models/room.model';
import { RoomsService } from '../../shared/services/rooms.service';
import { MatDialog } from '@angular/material/dialog';
import { RoomAddComponent } from './room-add/room-add.component';
import { faSearch } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-rooms',
  templateUrl: './rooms.template.html',
  styleUrls: ['./rooms.less'],
})
export class RoomsComponent implements OnInit, OnDestroy {
  faSearch = faSearch;

  rooms: Room[] = [];
  private roomsSubscription: Subscription;
  searchText: string = '';

  constructor(private roomsService: RoomsService, public dialog: MatDialog) {}

  ngOnInit(): void {
    this.roomsService.getRooms();
    this.roomsSubscription = this.roomsService
      .getRoomsUpdateListener()
      .subscribe((rooms: Room[]) => (this.rooms = rooms));
  }

  ngOnDestroy(): void {
   this.roomsSubscription.unsubscribe();
  }

  openDialog() {
    const dialogRef = this.dialog.open(RoomAddComponent);
  }

}
