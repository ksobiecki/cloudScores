import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Room } from './room/room.model';


  ];

  onSubmit(form: NgForm) {
    const room: Room = form.value;
    console.log(form.value);
    this.rooms.push(room);
  }

}
