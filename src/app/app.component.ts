import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LoginService } from 'src/shared/services/login.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.less'],
})
export class AppComponent implements OnInit {
  title = 'cloudScores';
  constructor(public router: Router, private authService: LoginService) {}

  ngOnInit() {
    this.authService.autoAuthUser();
  }
}
