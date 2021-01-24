import { AfterViewInit, Component, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';

@Component({
  selector: 'app-my-stats-table',
  templateUrl: './my-stats-table.template.html',
  styleUrls: ['./my-stats-table.less'],
})
export class MyStatsTableComponent implements AfterViewInit {
  displayedColumns: string[] = ['game name', 'games played', 'total score', 'global ranking'];
  dataSource = new MatTableDataSource<MyStatsTableElement>(ELEMENT_DATA);

  @ViewChild(MatPaginator) paginator: MatPaginator;

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }
}

export interface MyStatsTableElement {
  gameName: string;
  gamesPlayed: number;
  totalScore: number;
  globalRanking: number;
}

const ELEMENT_DATA: MyStatsTableElement[] = [
  { gameName: 'AmongUs', gamesPlayed: 3, totalScore: 10, globalRanking: 1002 },
  { gameName: 'AmongUs1', gamesPlayed: 3, totalScore: 10, globalRanking: 1003 },
  { gameName: 'AmongUs2', gamesPlayed: 3, totalScore: 10, globalRanking: 1004 },
  { gameName: 'AmongUs3', gamesPlayed: 3, totalScore: 10, globalRanking: 1005 },
  { gameName: 'AmongUs4', gamesPlayed: 3, totalScore: 10, globalRanking: 1006 },
  { gameName: 'AmongUs5', gamesPlayed: 3, totalScore: 10, globalRanking: 1007 },
  { gameName: 'AmongUs6', gamesPlayed: 3, totalScore: 10, globalRanking: 1008 },
  { gameName: 'AmongUs7', gamesPlayed: 3, totalScore: 10, globalRanking: 1009 },
  { gameName: 'AmongUs8', gamesPlayed: 3, totalScore: 10, globalRanking: 1000 },
  { gameName: 'AmongUs9', gamesPlayed: 3, totalScore: 10, globalRanking: 1023 },
  { gameName: 'AmongUs10', gamesPlayed: 3, totalScore: 10, globalRanking: 1022 },
  { gameName: 'AmongUs11', gamesPlayed: 3, totalScore: 10, globalRanking: 1032 },
  { gameName: 'AmongUs12', gamesPlayed: 3, totalScore: 10, globalRanking: 1042 },
  { gameName: 'AmongUs13', gamesPlayed: 3, totalScore: 10, globalRanking: 1052 },
  { gameName: 'AmongUs14', gamesPlayed: 3, totalScore: 10, globalRanking: 1062 },
];
