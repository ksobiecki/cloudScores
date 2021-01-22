import { Component } from '@angular/core';
import { Router } from '@angular/router';
import {LoginService} from '../shared/services/login.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.less'],
})
export class AppComponent {
  title = 'cloudScores';
  constructor(public router: Router) {}
}
