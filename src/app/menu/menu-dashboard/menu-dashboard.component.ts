import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import {
  faMedal,
  faGamepad,
  faTrophy,
} from '@fortawesome/free-solid-svg-icons';
import { Game } from 'src/shared/models/game.model';
import { Room } from 'src/shared/models/room.model';
import { User } from 'src/shared/models/user.model';
import { LoginService } from 'src/shared/services/login.service';
import { RoomsService } from 'src/shared/services/rooms.service';
import { DeleteConfirmModalComponent } from './delete-confirm-modal/delete-confirm-modal.component';

@Component({
  selector: 'app-menu-dashboard',
  templateUrl: './menu-dashboard.template.html',
  styleUrls: ['./menu-dashboard.less'],
})
export class MenuDashboardComponent implements OnInit {
  faMedal = faMedal;
  faGamepad = faGamepad;
  faTrophy = faTrophy;

  currentGame: Game = null;
  currentUser: User = null;
  currentRoom: Room = null;

  constructor(
    public roomsService: RoomsService,
    public loginService: LoginService,
    private route: ActivatedRoute,
    private router: Router,
    public dialog: MatDialog
  ) {}

  ngOnInit(): void {
    this.currentRoom = this.roomsService.getCurrentRoom(
      this.route.snapshot.params['name']
    );
    this.currentUser = this.loginService.getCurrentUser();
    if (
      this.roomsService.getCurrentGame(
        this.route.snapshot.params['gameName']
      ) !== null
    ) {
      this.currentGame = this.roomsService.getCurrentGame(
        this.route.snapshot.params['gameName']
      );
    }
  }

  copyCode = () => {
    let tempInput = document.createElement('input');
    tempInput.classList.add('hidden-input');
    tempInput.value = this.currentRoom.code;
    document.body.appendChild(tempInput);
    tempInput.select();
    document.execCommand('copy');
    document.body.removeChild(tempInput);
  };

  onMyStatsClick = () => {
    this.router.navigate(['my-stats']);
  };

  onGamesStatsClick = () => {
    const routeStr =
      this.currentRoom.name + '/' + this.currentGame.name + '/stats';
    this.router.navigate([routeStr]);
  };

  onChangeRoom = () => {
    this.currentGame = null;
    this.currentRoom = null;
    this.router.navigate(['/rooms']);
    console.log(this.currentRoom, this.currentGame);
  };

  onChangeGame = () => {
    this.currentGame = null;
    this.router.navigate([this.currentRoom.name, 'games']);
    console.log(this.currentRoom, this.currentGame);
  };

  onDelete(roomId: string) {
    const dialogRef = this.dialog.open(DeleteConfirmModalComponent, {
      data: {
        currentRoom: this.currentRoom,
        isAuthor: this.isRoomAuthor(),
      },
    });
  }

  isRoomAuthor = () => {
    if (this.currentRoom.author === this.currentUser.username) return true;
    else return false;
  };
}
