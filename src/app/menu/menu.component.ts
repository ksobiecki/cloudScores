import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.template.html',
  styleUrls: ['./menu.less'],
})
export class MenuComponent {
  constructor(public router: Router) {}
}
