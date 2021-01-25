import {AfterViewInit, Component, Inject, OnInit, ViewChild} from '@angular/core';
import {NgForm} from '@angular/forms';
import {ActivatedRoute, Router} from '@angular/router';
import {Room} from 'src/shared/models/room.model';
import {RoomsService} from 'src/shared/services/rooms.service';
import {Game} from '../../../../shared/models/game.model';
import {faTimes} from '@fortawesome/free-solid-svg-icons';
import {MatDialog} from '@angular/material/dialog';
import {MAT_DIALOG_DATA} from '@angular/material/dialog';
import {Subscription} from 'rxjs';
import {MatTableDataSource} from '@angular/material/table';
import {MatPaginator} from '@angular/material/paginator';
import {SelectionModel} from '@angular/cdk/collections';
import {MatCheckbox} from '@angular/material/checkbox';

@Component({
  selector: 'app-game-add',
  templateUrl: './game-add.template.html',
  styleUrls: ['./game-add.less'],
})
export class GameAddComponent implements OnInit, AfterViewInit {
  faClose = faTimes;
  allGames: Game[] = [];
  addedGames: Game[] = [];
  games: Game[] = [];
  allGameSubscription: Subscription;
  addedGameSubscription: Subscription;
  dataSource = new MatTableDataSource<Game>(this.games);
  displayedColumns = ['select', 'name', 'image'];
  selection = new SelectionModel<Game>(false, []);
  isAnythingSelected = false;
  @ViewChild(MatPaginator) paginator: MatPaginator;

  constructor(
    private roomsService: RoomsService,
    private route: ActivatedRoute,
    private dialog: MatDialog,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
  }

  ngAfterViewInit(): void {
    this.dataSource.paginator = this.paginator;
  }

  ngOnInit(): void {
    this.roomsService.getAllGames();
    this.allGameSubscription = this.roomsService
      .getAllGamesUpdateListener()
      .subscribe((games: Game[]) => {
        this.allGames = games;
        // this.updateGames(); nie wiem czy potrzebujesz 2 razy to wywolywac
      });
    this.roomsService.getGamesForRoom(this.data.currentRoom);
    this.addedGameSubscription = this.roomsService
      .getGamesForRoomUpdateListener()
      .subscribe((games: Game[]) => {
        this.addedGames = games;
        this.updateGames();
      });
    const allGames: Game[] = this.roomsService.allGames;
    this.dataSource.paginator = this.paginator;
  }

  onSubmit(form: NgForm): void {
    const currentRoom: string = this.data.currentRoom;
    const room: Room = this.roomsService.getCurrentRoom(currentRoom)
    const chosenGame = this.selection.selected[0];
    chosenGame.imgUrl = chosenGame.imgUrl.substring(3);
    this.roomsService.addGameToRoom(currentRoom, chosenGame);
    // this.roomsService.addMatchToRoom(room, chosenGame);
    // this.roomsService.addGame(currentRoom, game);
  }

  closeModal(): void {
    const thisDialogRef = this.dialog.closeAll();
  }

  /** Whether the number of selected elements matches the total number of rows. */
  isAllSelected(): boolean {
    const numSelected = this.selection.selected.length;
    const numRows = this.dataSource.data.length;
    return numSelected === numRows;
  }

  /** Selects all rows if they are not all selected; otherwise clear selection. */
  masterToggle(): void {
    this.isAllSelected() ?
      this.selection.clear() :
      this.dataSource.data.forEach(row => this.selection.select(row));
  }

  /** The label for the checkbox on the passed row */
  checkboxLabel(row?: Game): string {
    if (!row) {
      return `${this.isAllSelected() ? 'select' : 'deselect'} all`;
    }
    return `${this.selection.isSelected(row) ? 'deselect' : 'select'} row ${row.name}`;
  }

  onSelectionChanged(): void {
    if (this.selection.selected.length > 0) {
      this.isAnythingSelected = true;
    } else {
      this.isAnythingSelected = false;
    }
  }

  updateGames(): void {
    const input = (document.getElementById('name') as HTMLInputElement).value.toLowerCase();
    this.games = [];
    const allGamesCopy = this.allGames.map(obj => ({...obj}))
      .sort((a: Game, b: Game) => a.name.localeCompare(b.name));
    for (const addedGame of this.addedGames) {
      for (const game of allGamesCopy) {
        if(addedGame.name === game.name) {
          allGamesCopy.splice(allGamesCopy.indexOf(game), 1);
        }
      }
    }
    for (const game of allGamesCopy) {
      game.imgUrl = '../' + game.imgUrl;
      if (input === '' || game.name.toLowerCase().indexOf(input) === 0) {
        this.games.push(game);
      }
    }
    this.dataSource = new MatTableDataSource<Game>(this.games);
  }
}
