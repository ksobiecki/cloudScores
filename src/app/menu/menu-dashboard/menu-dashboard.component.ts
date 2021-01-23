import { Component } from '@angular/core';

@Component({
  selector: 'app-menu-dashboard',
  templateUrl: './menu-dashboard.template.html',
  styleUrls: ['./menu-dashboard.less'],
})
export class MenuDashboardComponent {
  chosenGame: string = 'f';
  inviteCode: string = 'XG4KM32P';
}
