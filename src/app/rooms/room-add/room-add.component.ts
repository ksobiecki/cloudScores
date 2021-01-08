import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Room } from '../room/room.model';
import { RoomsService } from '../rooms.service';

import {ElementRef, ViewChild} from '@angular/core';
import {COMMA, ENTER} from '@angular/cdk/keycodes';
import {FormControl} from '@angular/forms';
import {MatAutocompleteSelectedEvent, MatAutocomplete} from '@angular/material/autocomplete';
import {MatChipInputEvent} from '@angular/material/chips';
import {Observable} from 'rxjs';
import {map, startWith} from 'rxjs/operators';

@Component({
  selector: 'app-room-add',
  templateUrl: './room-add.template.html',
  styleUrls: ['./room-add.less']
})
export class RoomAddComponent {

  visible = true;
  selectable = true;
  removable = true;
  separatorKeysCodes: number[] = [ENTER, COMMA];
  userCtrl = new FormControl();
  filteredUsers: Observable<string[]>;
  users: string[] = [];
  allUsers: string[] = ['Krzyś', 'Piter', 'Pyć'];
  autocompleteUserList: string[] = [...this.allUsers];

  @ViewChild('userInput') userInput: ElementRef<HTMLInputElement>;
  @ViewChild('auto') matAutocomplete: MatAutocomplete;

  constructor(private roomsService: RoomsService) {
    this.filteredUsers = this.userCtrl.valueChanges.pipe(
      startWith(null),
      map((user: string | null) => user ? this._filter(user) : null)); // this.autocompleteUserList.slice()));
  }

  add(event: MatChipInputEvent): void {
    const input = event.input;
    const value = event.value;

    // User chose some username from list or wrote something
    if ((value || '').trim()) {
      // In case user wrote something, check if it maches any username
      // that hasn't been chosen yet
      const index = this.autocompleteUserList.indexOf(value);
      if(index >= 0) {
        // Valid username - add them
        this.users.push(value.trim());
        // Remove added usenrma from autocomplete list
        this.autocompleteUserList.splice(index, 1);
        // Clear input
        if (input) {
          input.value = '';
        }
        // Hide autocomplete list
        this.userCtrl.setValue(null);
      }
    }
  }

  remove(user: string): void {
    const index = this.users.indexOf(user);
    if(this.allUsers.indexOf(user) >= 0) {
      this.autocompleteUserList.push(user);
    }

    if (index >= 0) {
      this.users.splice(index, 1);
    }
  }

  selected(event: MatAutocompleteSelectedEvent): void {
    // Add user chosen from list
    this.users.push(event.option.viewValue);
    // Clear input
    this.userInput.nativeElement.value = '';
    // Hide autocomplete list
    this.userCtrl.setValue(null);

    const index = this.autocompleteUserList.indexOf(event.option.value);
    this.autocompleteUserList.splice(index, 1);
  }

  private _filter(value: string): string[] {
    const filterValue = value.toLowerCase();

    return this.autocompleteUserList.filter(
      user => (user.toLowerCase().indexOf(filterValue)) === 0 && (user.length - filterValue.length <= 3));
  }

  onSubmit(form: NgForm): void {
    const room: Room = form.value;
    this.roomsService.addRoom(room);

  }

}
