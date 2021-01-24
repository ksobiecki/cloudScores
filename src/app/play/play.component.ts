import {Component, OnInit} from '@angular/core';
import {Game} from '../../shared/models/game.model';
import {RoomsService} from '../../shared/services/rooms.service';
import {ActivatedRoute} from '@angular/router';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';

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
  constructor(public roomsService: RoomsService,
              public route: ActivatedRoute,
              // tslint:disable-next-line:variable-name
              private _formBuilder: FormBuilder
              ) {
  }
  ngOnInit(): void {
    this.currentGame = this.roomsService.getGame(this.route.snapshot.params['gameName']);
    this.currentGameIcon = '../' + this.currentGame.imgUrl;
    this.firstFormGroup = this._formBuilder.group({
      firstCtrl: ['', Validators.required]
    });
    this.secondFormGroup = this._formBuilder.group({
      secondCtrl: ['', Validators.required]
    });
  }
}
