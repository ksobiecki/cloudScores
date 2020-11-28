import { Component, Input } from "@angular/core";
import { Room } from './room.model';

@Component({
  selector: 'app-room',
  templateUrl: './room.template.html',
  styleUrls: ['./room.less']
})
export class RoomComponent {

  @Input() room: Room;

}
