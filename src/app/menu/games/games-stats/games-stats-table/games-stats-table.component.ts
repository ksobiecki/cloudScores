import { AfterViewInit, Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';
import { Subscription } from 'rxjs';
import { RoomsService } from 'src/shared/services/rooms.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-games-stats-table',
  templateUrl: './games-stats-table.template.html',
  styleUrls: ['./games-stats-table.less'],
})
export class GamesStatsTableComponent implements OnInit, OnDestroy, AfterViewInit {
  private statsByRoomSubscription: Subscription;
  displayedColumns: string[] = ['playerName', 'gamesPlayed', 'gamesWon', 'totalScore'];
  ELEMENT_DATA: StatsByRoomTableElement[] = [];
  dataSource = new MatTableDataSource<StatsByRoomTableElement>(this.ELEMENT_DATA);

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor (public roomsService: RoomsService, public route: ActivatedRoute) {}

  ngOnInit(): void {
    const currentGame = this.roomsService.getCurrentGame(this.route.snapshot.params['gameName']);
    console.log(currentGame);
    this.roomsService.getScoreByRoom(currentGame);
    this.statsByRoomSubscription = this.roomsService
      .getScoreByRoomUpdateListener()
      .subscribe(
        (data: any[]) =>
          (this.ELEMENT_DATA = data.map((data) => {
            let object: StatsByRoomTableElement = {
              playerName: data.playerName,
              gamesPlayed: data.gamesPlayed,
              gamesWon: data.gamesWon,
              totalScore: data.totalScore
            };
            console.log(object);
            return object;
          }),
          this.dataSource = new MatTableDataSource<StatsByRoomTableElement>(this.ELEMENT_DATA)
          )
      );
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  ngOnDestroy(): void {
    this.statsByRoomSubscription.unsubscribe();
  }
}

export interface StatsByRoomTableElement {
  playerName: string;
  gamesPlayed: number;
  gamesWon: number;
  totalScore: number;
}

// const ELEMENT_DATA: GamesStatsTableElement[] = [
//   { playerName: 'Impostor', gamesPlayed: 8, gamesWon: 50, totalScore: 5000 },
//   { playerName: 'Pyć', gamesPlayed: 5, gamesWon: 30, totalScore: 4900 },
//   { playerName: 'Smoli', gamesPlayed: 6, gamesWon: 25, totalScore: 4500 },
//   { playerName: 'Pjoter', gamesPlayed: 4, gamesWon: 22, totalScore: 4000 },
//   { playerName: 'Kszyś', gamesPlayed: 5, gamesWon: 22, totalScore: 3800 },
//   { playerName: 'jankowalski', gamesPlayed: 4, gamesWon: 20, totalScore: 3650 },
//   { playerName: 'Halo123', gamesPlayed: 3, gamesWon: 17, totalScore: 2500 },
//   { playerName: 'testUser1', gamesPlayed: 3, gamesWon: 10, totalScore: 1009 },
//   { playerName: 'testUser2', gamesPlayed: 3, gamesWon: 10, totalScore: 1000 },
//   { playerName: 'testUser3', gamesPlayed: 3, gamesWon: 10, totalScore: 1023 },
//   { playerName: 'testUser4', gamesPlayed: 3, gamesWon: 10, totalScore: 1022 },
//   { playerName: 'testUser5', gamesPlayed: 3, gamesWon: 10, totalScore: 1032 },
//   { playerName: 'testUser6', gamesPlayed: 3, gamesWon: 10, totalScore: 1042 },
//   { playerName: 'testUser7', gamesPlayed: 3, gamesWon: 10, totalScore: 1052 },
//   { playerName: 'testUser8', gamesPlayed: 3, gamesWon: 10, totalScore: 1062 },
// ];
