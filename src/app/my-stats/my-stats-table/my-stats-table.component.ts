import { AfterViewInit, Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';
import { RoomsService } from 'src/shared/services/rooms.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-my-stats-table',
  templateUrl: './my-stats-table.template.html',
  styleUrls: ['./my-stats-table.less'],
})
export class MyStatsTableComponent implements OnInit, OnDestroy, AfterViewInit {
  private myStatsSubscription: Subscription;
  displayedColumns: string[] = ['gameName', 'gamesPlayed', 'totalScore', 'globalRanking'];
  ELEMENT_DATA: MyStatsTableElement[] = [];
  dataSource = new MatTableDataSource<MyStatsTableElement>(this.ELEMENT_DATA);

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor (public roomsService: RoomsService) {}

  ngOnInit(): void {
    this.roomsService.getMyScore();
    this.myStatsSubscription = this.roomsService
      .getMyScoreUpdateListener()
      .subscribe(
        (data: any[]) =>
          (this.ELEMENT_DATA = data.map((data) => {
            let object: MyStatsTableElement = {
              gameName: data.gameName,
              gamesPlayed: data.gamesPlayed,
              totalScore: data.totalScore,
              globalRanking: 9999
            };
            return object;
          }),
          this.dataSource = new MatTableDataSource<MyStatsTableElement>(this.ELEMENT_DATA)
          )
      );
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  ngOnDestroy(): void {
    this.myStatsSubscription.unsubscribe();
  }
}

export interface MyStatsTableElement {
  gameName: string,
  gamesPlayed: number,
  totalScore: number;
  globalRanking: number;
}