import {Component, OnInit} from '@angular/core';
import {Game} from '../../shared/models/game.model';
import {RoomsService} from '../../shared/services/rooms.service';
import {ActivatedRoute} from '@angular/router';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {MatTableDataSource} from '@angular/material/table';
import {User} from '../../shared/models/user.model';
import {SelectionModel} from '@angular/cdk/collections';
import {MatStepper} from '@angular/material/stepper';
import {Location} from '@angular/common';
import {TimeInterval} from 'rxjs';
import {CdkDragDrop, moveItemInArray} from '@angular/cdk/drag-drop';

@Component({
  selector: 'app-play',
  templateUrl: './play.template.html',
  styleUrls: ['./play.less'],
})
export class PlayComponent implements OnInit {
  currentGame: Game;
  currentGameIcon: string;
  isLinear = true;
  firstFormGroup: FormGroup;
  secondFormGroup: FormGroup;
  userList: User[] = [
    {_id: null, password: null, email: null, rooms_id: null, username: 'Krszyś'},
    {_id: null, password: null, email: null, rooms_id: null, username: 'Pyciu'},
    {_id: null, password: null, email: null, rooms_id: null, username: 'Michał'},
    {_id: null, password: null, email: null, rooms_id: null, username: 'user1'},
    {_id: null, password: null, email: null, rooms_id: null, username: 'user2'},
    {_id: null, password: null, email: null, rooms_id: null, username: 'user3'},
    {_id: null, password: null, email: null, rooms_id: null, username: 'user4'},
    {_id: null, password: null, email: null, rooms_id: null, username: 'user5'},
    {_id: null, password: null, email: null, rooms_id: null, username: 'user6'}];
  dataSource = new MatTableDataSource<User>(this.userList);
  displayedColumns = ['select', 'username'];
  selection = new SelectionModel<User>(true, []);
  isAnythingSelected = false;
  chosenPlayers: string[];
  scores: string[];
  time: number;
  timeStr: string;
  isTimerPaused = true;
  interval;
  constructor(public roomsService: RoomsService,
              public route: ActivatedRoute,
              // tslint:disable-next-line:variable-name
              private _formBuilder: FormBuilder,
              public _location: Location,
              ) {
  }
  ngOnInit(): void {
    this.currentGame = this.roomsService.getGame(this.route.snapshot.params['gameName']);
    this.currentGameIcon = '../' + this.currentGame.imgUrl;
    this.firstFormGroup = this._formBuilder.group({
      firstCtrl: ['']
    });
    this.secondFormGroup = this._formBuilder.group({
      secondCtrl: ['']
    });
  }
  /** Whether the number of selected elements matches the total number of rows. */
  isAllSelected(): boolean {
    const numSelected = this.selection.selected.length;
    const numRows = this.dataSource.data.length;
    return numSelected === numRows;
  }

  /** Selects all rows if they are not all selected; otherwise clear selection. */
  masterToggle(): void {
    this.isAllSelected() ?
      this.selection.clear() :
      this.dataSource.data.forEach(row => this.selection.select(row));
  }

  /** The label for the checkbox on the passed row */
  checkboxLabel(row?: User): string {
    if (!row) {
      return `${this.isAllSelected() ? 'select' : 'deselect'} all`;
    }
    return `${this.selection.isSelected(row) ? 'deselect' : 'select'} row ${row.username}`;
  }

  onSelectionChanged(): void {
    if (this.selection.selected.length > 0) {
      this.isAnythingSelected = true;
    } else {
      this.isAnythingSelected = false;
    }
  }

  onBackPressed(): void {
    this._location.back();
  }

  getChosenPlayers(): void {
    this.chosenPlayers = [];
    for(const user of this.selection.selected) {
      this.chosenPlayers.push(user.username);
    }
  }

  startTimer(): void {
    this.time = 0;
    this.timeStr = '00:00:00';
    this.isTimerPaused = false;
    this.interval = setInterval(() => {
      this.time++;
      this.updateTimeStr();
    }, 1000);
  }

  updateTimeStr(): void {
    const hours = Math.floor(this.time / 3600);
    // const minutes = this.time - (hours * 3600) % 60;
    const minutes = Math.floor((this.time % 3600) / 60);
    // const seconds = this.time - ((hours * 3600) + (minutes * 60));
    const seconds = (this.time % 3600) % 60;
    let hoursStr = hours.toString();
    let minutesStr = minutes.toString();
    let secondsStr = seconds.toString();
    if (hoursStr.length === 1) {
      hoursStr = '0' + hoursStr;
    }
    if (minutesStr.length === 1) {
      minutesStr = '0' + minutesStr;
    }
    if (secondsStr.length === 1) {
      secondsStr = '0' + secondsStr;
    }
    this.timeStr = hoursStr + ':' + minutesStr + ':' + secondsStr;
  }

  pauseTimer(): void {
    this.isTimerPaused = false;
    clearInterval(this.interval);
  }

  drop(event: CdkDragDrop<string[]>): void {
    moveItemInArray(this.chosenPlayers, event.previousIndex, event.currentIndex);
    this.updateScores();
  }

  updateScores(): void {
    this.scores = [];
    for (let i = 1; i <= this.chosenPlayers.length; i++) {
      const text = i.toString() + '. ' + this.chosenPlayers[i-1];
      this.scores.push(text);
    }
  }

  onSave(): void {
    console.log('save');
  }
}
