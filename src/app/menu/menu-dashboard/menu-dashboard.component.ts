import { Component, Input, OnInit } from '@angular/core';
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

  chosenGameName: string = '';
  inviteCode: string = 'XG4KM32P';
  isRoomAuthor: boolean = false;
  currentRoom: Room;

  constructor(
    public roomsService: RoomsService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.currentRoom = this.roomsService.getRoom(
      this.route.snapshot.params['name']
    );
  }

  onDelete(roomId: string) {
    this.roomsService.deleteRoom(roomId);
  }

  copyCode = () => {
    let tempInput = document.createElement('input');
    tempInput.classList.add('hidden-input');
    tempInput.value = this.inviteCode;
    document.body.appendChild(tempInput);
    tempInput.select();
    document.execCommand('copy');
    document.body.removeChild(tempInput);
  };
}
