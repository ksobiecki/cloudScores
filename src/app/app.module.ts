import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';

import { AppComponent } from './app.component';
import { RoomsComponent } from './rooms/rooms.component';
import { RoomComponent } from './rooms/room/room.component';
import { AppRoutingModule } from './app-routing.module';
import { GamesComponent } from './menu/games/games.component';
import { GameComponent } from './menu/games/game/game.component';
import { RoomAddComponent } from './rooms/room-add/room-add.component';
import { MatChipsModule } from '@angular/material/chips';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatIconModule } from '@angular/material/icon';
import { GameAddComponent } from './menu/games/game-add/game-add.component';
import { HeaderComponent } from './header/header.component';
import { FilterPipe } from '../shared/pipes/filter.pipe';
import { LoginComponent } from './auth/login/login.component';
import { MatCardModule } from '@angular/material/card';
import { SignupComponent } from './auth/signup/signup.component';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { RoomCreateComponent } from './rooms/room-create/room-create.component';
import { RoomJoinComponent } from './rooms/room-join/room-join.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { HttpClientModule } from '@angular/common/http';
import { SharedModule } from 'src/shared/shared.module';
import { MenuDashboardComponent } from './menu/menu-dashboard/menu-dashboard.component';
import { MenuComponent } from './menu/menu.component';
import { GameMenuComponent } from './menu/game-menu/game-menu.component';
import { MyStatsComponent } from './my-stats/my-stats.component';
import { MyStatsTableComponent } from './my-stats/my-stats-table/my-stats-table.component';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import {MatCheckboxModule} from '@angular/material/checkbox';
import {GamesStatsComponent} from './menu/games/games-stats/games-stats.component';
import {GamesStatsTableComponent} from './menu/games/games-stats/games-stats-table/games-stats-table.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    RoomsComponent,
    RoomComponent,
    GamesComponent,
    GameComponent,
    RoomAddComponent,
    RoomCreateComponent,
    RoomJoinComponent,
    GameAddComponent,
    FilterPipe,
    LoginComponent,
    SignupComponent,
    MenuComponent,
    MenuDashboardComponent,
    GameMenuComponent,
    MyStatsComponent,
    MyStatsTableComponent,
    GamesStatsComponent,
    GamesStatsTableComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    ReactiveFormsModule,
    FontAwesomeModule,
    HttpClientModule,
    SharedModule,

    MatInputModule,
    MatButtonModule,
    MatDialogModule,
    MatFormFieldModule,
    MatChipsModule,
    MatAutocompleteModule,
    MatIconModule,
    MatCardModule,
    MatProgressSpinnerModule,
    MatTableModule,
    MatPaginatorModule,
    MatCheckboxModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
