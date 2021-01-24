import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { Room } from '../../shared/models/room.model';
import { RoomsService } from '../../shared/services/rooms.service';
import { MatDialog } from '@angular/material/dialog';
import { RoomAddComponent } from './room-add/room-add.component';
import { RoomCreateComponent } from './room-create/room-create.component';
import { LoginService } from '../../shared/services/login.service';

@Component({
  selector: 'app-rooms',
  templateUrl: './rooms.template.html',
  styleUrls: ['./rooms.less'],
})
export class RoomsComponent implements OnInit, OnDestroy {
  rooms: Room[] = [];
  userIsAuthenticated = false;
  private roomsSubscription: Subscription;
  private authStatusSubscription: Subscription;
  @Input() searchText: string = '';

  constructor(
    private roomsService: RoomsService,
    public dialog: MatDialog,
    private authService: LoginService
  ) {}

  ngOnInit(): void {
    this.roomsService.getRooms();
    this.roomsSubscription = this.roomsService
      .getRoomsUpdateListener()
      .subscribe((rooms: Room[]) => (this.rooms = rooms));
    this.userIsAuthenticated = this.authService.getIsAuth();
    this.authStatusSubscription = this.authService
      .getAuthStatusListener()
      .subscribe((isAuthenticated) => {
        this.userIsAuthenticated = isAuthenticated;
      });
  }

  ngOnDestroy(): void {
    this.roomsSubscription.unsubscribe();
    this.authStatusSubscription.unsubscribe();
  }

  openDialog(): void {
    const dialogRef = this.dialog.open(RoomAddComponent);
  }
}
