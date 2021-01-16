import {Component} from '@angular/core';
import {NgForm} from '@angular/forms';

@Component({
  selector: 'app-room-join',
  templateUrl: './room-join.template.html',
  styleUrls: ['./room-join.less']
})
export class RoomJoinComponent {
  onSubmit(form: NgForm): void {}
}
