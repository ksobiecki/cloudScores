import { AfterViewInit, Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { RoomsService } from 'src/shared/services/rooms.service';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { Match } from 'src/shared/models/match.model';

@Component({
  selector: 'app-matches-table',
  templateUrl: './matches-table.template.html',
  styleUrls: ['./matches-table.less'],
})
export class MatchesTableComponent implements OnInit, OnDestroy, AfterViewInit {
  private matchesSubscription: Subscription;
  displayedColumns: string[] = ['date', 'players', 'matchDuration'];
  ELEMENT_DATA: MatchesTableElement[] = [];
  dataSource = new MatTableDataSource<MatchesTableElement>(this.ELEMENT_DATA);

  @ViewChild(MatPaginator) paginator: MatPaginator;

  constructor(
    private roomsService: RoomsService,
    public route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    const currentGame = this.roomsService.getCurrentGame(
      this.route.snapshot.params['gameName']
    );
    const currentRoom = this.roomsService.getCurrentRoom(
      this.route.snapshot.params['name']
    );
    this.roomsService.getMatchesForRoom(currentRoom.name, currentGame.name);
    this.matchesSubscription = this.roomsService
      .getMatchesForRoomUpdateListener()
      .subscribe(
        (matches: Match[]) =>
          (this.ELEMENT_DATA = matches.map((data) => {
            let object: MatchesTableElement = {
              date: data.date,
              players: data.players.length,
              matchDuration: data.duration.toString(),
            };
            console.log(object);
            return object;
          }),
          this.dataSource = new MatTableDataSource<MatchesTableElement>(this.ELEMENT_DATA)
          )
      );
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }

  ngOnDestroy(): void {
    this.matchesSubscription.unsubscribe();
  }
}

export interface MatchesTableElement {
  date: string;
  players: number;
  matchDuration: string;
}

// const ELEMENT_DATA: MatchesTableElement[] = [
//   { date: 'Jan 24 2021', players: 3, matchDuration: '19:28:59'},
//   { date: 'Jan 24 2021', players: 3, matchDuration: '19:28:59'},
//   { date: 'Jan 24 2021', players: 3, matchDuration: '19:28:59'},
//   { date: 'Jan 24 2021', players: 3, matchDuration: '19:28:59'},
//   { date: 'Jan 24 2021', players: 3, matchDuration: '19:28:59'},
//   { date: 'Jan 24 2021', players: 3, matchDuration: '19:28:59'},
//   { date: 'Jan 24 2021', players: 3, matchDuration: '19:28:59'},
//   { date: 'Jan 24 2021', players: 3, matchDuration: '19:28:59'},
//   { date: 'Jan 24 2021', players: 3, matchDuration: '19:28:59'},
//   { date: 'Jan 24 2021', players: 3, matchDuration: '19:28:59'},
//   { date: 'Jan 24 2021', players: 3, matchDuration: '19:28:59'},
//   { date: 'Jan 24 2021', players: 3, matchDuration: '19:28:59'},
//   { date: 'Jan 24 2021', players: 3, matchDuration: '19:28:59'},
//   { date: 'Jan 24 2021', players: 3, matchDuration: '19:28:59'},
//   { date: 'Jan 24 2021', players: 3, matchDuration: '19:28:59'},
// ];
