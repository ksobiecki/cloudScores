import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import {
  faMedal,
  faGamepad,
  faTrophy,
} from '@fortawesome/free-solid-svg-icons';
import { Game } from 'src/shared/models/game.model';
import { Room } from 'src/shared/models/room.model';
import { RoomsService } from 'src/shared/services/rooms.service';

@Component({
  selector: 'app-menu-dashboard',
  templateUrl: './menu-dashboard.template.html',
  styleUrls: ['./menu-dashboard.less'],
})
export class MenuDashboardComponent implements OnInit {
  faMedal = faMedal;
  faGamepad = faGamepad;
  faTrophy = faTrophy;

  // chosenGameName: string = '';
  currentGame: Game = null;

  isRoomAuthor: boolean = false;
  currentRoom: Room = null;

  constructor(
    public roomsService: RoomsService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.currentRoom = this.roomsService.getCurrentRoom(
      this.route.snapshot.params['name']
    );
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

  onDelete(roomId: string) {
    this.roomsService.deleteRoom(roomId);
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

  onChangeRoom = () => {
    this.currentGame = null;
    this.currentRoom = null;
    this.router.navigate(['/rooms']);
    console.log(this.currentRoom, this.currentGame);
  }

  onChangeGame = () => {
    this.currentGame = null;
    this.router.navigate([this.currentRoom.name, 'games']);
    console.log(this.currentRoom, this.currentGame);
  }
}
