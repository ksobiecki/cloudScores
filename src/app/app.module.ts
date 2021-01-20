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
import { GameAddComponent } from './menu/games/game-add/game-add.component';
import { HeaderComponent } from './header/header.component';
import { FilterPipe } from '../shared/pipes/filter.pipe';
import { LoginComponent } from './auth/login/login.component';
import { MatCardModule } from '@angular/material/card';
import { SignupComponent } from './auth/signup/signup.component';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { HttpClientModule } from '@angular/common/http';
import { SharedModule } from 'src/shared/shared.module';
import { MenuSettingsComponent } from './menu/menu-settings/menu-settings.component';
import { MenuComponent } from './menu/menu.component';
@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    RoomsComponent,
    RoomComponent,
    GamesComponent,
    GameComponent,
    RoomAddComponent,
    GameAddComponent,
    FilterPipe,
    LoginComponent,
    SignupComponent,
    MenuComponent,
    MenuSettingsComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    MatInputModule,
    MatButtonModule,
    MatDialogModule,
    MatFormFieldModule,
    MatCardModule,
    MatProgressSpinnerModule,
    FontAwesomeModule,
    HttpClientModule,
    SharedModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
