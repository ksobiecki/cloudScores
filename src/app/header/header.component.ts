import {Component, OnInit} from '@angular/core';
import {LoginService} from '../../shared/services/login.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.template.html',
  styleUrls: ['./header.less'],
})
export class HeaderComponent implements OnInit {
  username = 'Krzyś';
  constructor(private loginService: LoginService) {}

  logout(): void {
    this.loginService.logOut();
  }

  ngOnInit(): void {
    this.username = this.loginService.getUsername();
  }
}
