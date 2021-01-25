import { OnDestroy } from '@angular/core';
import {Component, OnInit} from '@angular/core';
import { Subscription } from 'rxjs';
import { User } from 'src/shared/models/user.model';
import {LoginService} from '../../shared/services/login.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.template.html',
  styleUrls: ['./header.less'],
})
export class HeaderComponent implements OnInit, OnDestroy {
  userIsAuthenticated = false
  private authListenerSubs: Subscription;
  username = 'Krzyś';
  user: User;
  constructor(private loginService: LoginService) {}

  logout(): void {
    this.loginService.logOut();
  }

  ngOnInit(): void {
    this.username = this.loginService.getUsername();
    this.userIsAuthenticated = this.loginService.getIsAuth();
    this.authListenerSubs = this.loginService
    .getAuthStatusListener()
    .subscribe( isAuthenticated => {
      this.userIsAuthenticated = isAuthenticated;
    });
    this.loginService
    .getUsernameListener()
    .subscribe(user => {
      this.user = user;
      this.username = this.user.username;
    })
  }

  ngOnDestroy(): void {
    this.authListenerSubs.unsubscribe();
  }
}
