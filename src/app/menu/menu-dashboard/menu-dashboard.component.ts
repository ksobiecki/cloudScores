import { Component } from '@angular/core';
import {
  faMedal,
  faGamepad,
  faTrophy,
} from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-menu-dashboard',
  templateUrl: './menu-dashboard.template.html',
  styleUrls: ['./menu-dashboard.less'],
})
export class MenuDashboardComponent {
  faMedal = faMedal;
  faGamepad = faGamepad;
  faTrophy = faTrophy;

  chosenGame: string = '';
  inviteCode: string = 'XG4KM32P';
  isRoomAuthor: boolean = false;

  copyCode = () => {
    let tempInput = document.createElement("input");
    tempInput.classList.add('hidden-input');
    tempInput.value = this.inviteCode;
    document.body.appendChild(tempInput);
    tempInput.select();
    document.execCommand("copy");
    document.body.removeChild(tempInput);
  };
}
