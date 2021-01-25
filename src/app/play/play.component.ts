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
    {_id: null, password: null, email: null, rooms_id: null, username: 'Michał'}];
  dataSource = new MatTableDataSource<User>(this.userList);
  displayedColumns = ['select', 'username'];
  selection = new SelectionModel<User>(true, []);
  isAnythingSelected = false;
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
      secondCtrl: ['', Validators.required]
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
}
