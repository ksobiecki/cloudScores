import { AfterViewInit, Component, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';

@Component({
  selector: 'app-matches-table',
  templateUrl: './matches-table.template.html',
  styleUrls: ['./matches-table.less'],
})
export class MatchesTableComponent implements AfterViewInit {
  displayedColumns: string[] = ['date', 'players', 'matchDuration'];
  dataSource = new MatTableDataSource<MatchesTableElement>(ELEMENT_DATA);

  @ViewChild(MatPaginator) paginator: MatPaginator;

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }
}

export interface MatchesTableElement {
  date: string;
  players: number;
  matchDuration: string;
}

const ELEMENT_DATA: MatchesTableElement[] = [
  { date: 'Jan 24 2021', players: 3, matchDuration: '19:28:59'},
  { date: 'Jan 24 2021', players: 3, matchDuration: '19:28:59'},
  { date: 'Jan 24 2021', players: 3, matchDuration: '19:28:59'},
  { date: 'Jan 24 2021', players: 3, matchDuration: '19:28:59'},
  { date: 'Jan 24 2021', players: 3, matchDuration: '19:28:59'},
  { date: 'Jan 24 2021', players: 3, matchDuration: '19:28:59'},
  { date: 'Jan 24 2021', players: 3, matchDuration: '19:28:59'},
  { date: 'Jan 24 2021', players: 3, matchDuration: '19:28:59'},
  { date: 'Jan 24 2021', players: 3, matchDuration: '19:28:59'},
  { date: 'Jan 24 2021', players: 3, matchDuration: '19:28:59'},
  { date: 'Jan 24 2021', players: 3, matchDuration: '19:28:59'},
  { date: 'Jan 24 2021', players: 3, matchDuration: '19:28:59'},
  { date: 'Jan 24 2021', players: 3, matchDuration: '19:28:59'},
  { date: 'Jan 24 2021', players: 3, matchDuration: '19:28:59'},
  { date: 'Jan 24 2021', players: 3, matchDuration: '19:28:59'},
];
