import { Component, OnInit } from '@angular/core';
import { faMedal } from '@fortawesome/free-solid-svg-icons';
import { LoginService } from 'src/shared/services/login.service';


@Component({
  selector: 'app-my-stats',
  templateUrl: './my-stats.template.html',
  styleUrls: ['./my-stats.less'],
})
export class MyStatsComponent implements OnInit{

  constructor(private loginService: LoginService) {}

  ngOnInit(): void {
    this.loginService.getMyStats();
  }
  faMedal = faMedal;
}
