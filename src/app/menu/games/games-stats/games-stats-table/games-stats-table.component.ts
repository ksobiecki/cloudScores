import { AfterViewInit, Component, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';

@Component({
  selector: 'app-games-stats-table',
  templateUrl: './games-stats-table.template.html',
  styleUrls: ['./games-stats-table.less'],
})
export class GamesStatsTableComponent implements AfterViewInit {
  displayedColumns: string[] = ['playerName', 'gamesPlayed', 'gamesWon', 'totalScore'];
  dataSource = new MatTableDataSource<GamesStatsTableElement>(ELEMENT_DATA);

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }
}

export interface GamesStatsTableElement {
  playerName: string;
  gamesPlayed: number;
  gamesWon: number;
  totalScore: number;
}

const ELEMENT_DATA: GamesStatsTableElement[] = [
  { playerName: 'Impostor', gamesPlayed: 8, gamesWon: 50, totalScore: 5000 },
  { playerName: 'Pyć', gamesPlayed: 5, gamesWon: 30, totalScore: 4900 },
  { playerName: 'Smoli', gamesPlayed: 6, gamesWon: 25, totalScore: 4500 },
  { playerName: 'Pjoter', gamesPlayed: 4, gamesWon: 22, totalScore: 4000 },
  { playerName: 'Kszyś', gamesPlayed: 5, gamesWon: 22, totalScore: 3800 },
  { playerName: 'jankowalski', gamesPlayed: 4, gamesWon: 20, totalScore: 3650 },
  { playerName: 'Halo123', gamesPlayed: 3, gamesWon: 17, totalScore: 2500 },
  { playerName: 'testUser1', gamesPlayed: 3, gamesWon: 10, totalScore: 1009 },
  { playerName: 'testUser2', gamesPlayed: 3, gamesWon: 10, totalScore: 1000 },
  { playerName: 'testUser3', gamesPlayed: 3, gamesWon: 10, totalScore: 1023 },
  { playerName: 'testUser4', gamesPlayed: 3, gamesWon: 10, totalScore: 1022 },
  { playerName: 'testUser5', gamesPlayed: 3, gamesWon: 10, totalScore: 1032 },
  { playerName: 'testUser6', gamesPlayed: 3, gamesWon: 10, totalScore: 1042 },
  { playerName: 'testUser7', gamesPlayed: 3, gamesWon: 10, totalScore: 1052 },
  { playerName: 'testUser8', gamesPlayed: 3, gamesWon: 10, totalScore: 1062 },
];
