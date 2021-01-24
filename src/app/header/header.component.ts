import { OnDestroy } from '@angular/core';
import {Component, OnInit} from '@angular/core';
import { Subscription } from 'rxjs';
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
  }

  ngOnDestroy(): void {
    this.authListenerSubs.unsubscribe();
  }
}
