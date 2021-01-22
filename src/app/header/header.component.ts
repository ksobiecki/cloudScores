import { Component } from '@angular/core';
import {LoginService} from '../../shared/services/login.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.template.html',
  styleUrls: ['./header.less'],
})
export class HeaderComponent {
  username: string = 'Krzyś';
  constructor(private loginService: LoginService) {
  }
  logout(): void {
    this.loginService.logOut();
  }
}
