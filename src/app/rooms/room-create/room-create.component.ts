import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';

import {ElementRef, ViewChild} from '@angular/core';
import {COMMA, ENTER} from '@angular/cdk/keycodes';
import {FormControl} from '@angular/forms';
import {MatAutocompleteSelectedEvent, MatAutocomplete} from '@angular/material/autocomplete';
import {MatChipInputEvent} from '@angular/material/chips';
import {Observable} from 'rxjs';
import {map, startWith} from 'rxjs/operators';
import {$} from 'protractor';
import {MatDialog, MatDialogRef} from '@angular/material/dialog';
import { Room } from 'src/shared/models/room.model';
import { RoomsService } from 'src/shared/services/rooms.service';
import {faArrowLeft, faArrowRight, faTimes} from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-room-create',
  templateUrl: './room-create.template.html',
  styleUrls: ['./room-create.less']
})
export class RoomCreateComponent {
  faClose = faTimes;
  faLeft = faArrowLeft;
  faRight = faArrowRight;

  isHidden = true;
  selectable = true;
  removable = true;
  separatorKeysCodes: number[] = [ENTER, COMMA];
  userCtrl = new FormControl();
  filteredUsers: Observable<string[]>;
  users: string[] = [];
  allUsers: string[] = ['Krzyś', 'Piter', 'Pyć'];
  autocompleteUserList: string[] = [...this.allUsers];
  images: string[] = [];
  imagePointer = 0;

  @ViewChild('userInput') userInput: ElementRef<HTMLInputElement>;
  @ViewChild('auto') matAutocomplete: MatAutocomplete;

  constructor(private dialog: MatDialog, private roomsService: RoomsService) {
    this.getImages();
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
    room.imgSrc = this.images[this.imagePointer];
    this.roomsService.addRoom(room);

  }

  closeModal(): void {
    const thisDialogRef = this.dialog.closeAll();
  }

  nextImage(): void {
    if (this.imagePointer < this.images.length - 1) {
      this.imagePointer += 1;
    }
    else {
      this.imagePointer = 0;
    }
  }

  previousImage(): void {
    if (this.imagePointer > 0) {
      this.imagePointer -= 1;
    }
    else {
      this.imagePointer = this.images.length - 1;
    }
  }

  getImages(): void {
    for(let i = 1; i <= 24; i++) {
      const imageSrc = '../../../assets/img/room_images/avatar' + i.toString() + '.png';
      this.images.push(imageSrc);
    }
  }

}
