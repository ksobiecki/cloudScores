import { AfterViewInit, Component, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';

@Component({
  selector: 'app-games-stats-table',
  templateUrl: './games-stats-table.template.html',
  styleUrls: ['./games-stats-table.less'],
})
export class GamesStatsTableComponent implements AfterViewInit {
  displayedColumns: string[] = ['playerName', 'gamesPlayed', 'gamesWon', 'totalScore'];
  dataSource = new MatTableDataSource<GamesStatsTableElement>(ELEMENT_DATA);

  @ViewChild(MatPaginator) paginator: MatPaginator;

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }
}

export interface GamesStatsTableElement {
  playerName: string;
  gamesPlayed: number;
  gamesWon: number;
  totalScore: number;
}

const ELEMENT_DATA: GamesStatsTableElement[] = [
  { playerName: 'AmongUs', gamesPlayed: 3, gamesWon: 10, totalScore: 1002 },
  { playerName: 'AmongUs1', gamesPlayed: 3, gamesWon: 10, totalScore: 1003 },
  { playerName: 'AmongUs2', gamesPlayed: 3, gamesWon: 10, totalScore: 1004 },
  { playerName: 'AmongUs3', gamesPlayed: 3, gamesWon: 10, totalScore: 1005 },
  { playerName: 'AmongUs4', gamesPlayed: 3, gamesWon: 10, totalScore: 1006 },
  { playerName: 'AmongUs5', gamesPlayed: 3, gamesWon: 10, totalScore: 1007 },
  { playerName: 'AmongUs6', gamesPlayed: 3, gamesWon: 10, totalScore: 1008 },
  { playerName: 'AmongUs7', gamesPlayed: 3, gamesWon: 10, totalScore: 1009 },
  { playerName: 'AmongUs8', gamesPlayed: 3, gamesWon: 10, totalScore: 1000 },
  { playerName: 'AmongUs9', gamesPlayed: 3, gamesWon: 10, totalScore: 1023 },
  { playerName: 'AmongUs10', gamesPlayed: 3, gamesWon: 10, totalScore: 1022 },
  { playerName: 'AmongUs11', gamesPlayed: 3, gamesWon: 10, totalScore: 1032 },
  { playerName: 'AmongUs12', gamesPlayed: 3, gamesWon: 10, totalScore: 1042 },
  { playerName: 'AmongUs13', gamesPlayed: 3, gamesWon: 10, totalScore: 1052 },
  { playerName: 'AmongUs14', gamesPlayed: 3, gamesWon: 10, totalScore: 1062 },
];
