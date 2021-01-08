import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { GamesComponent } from './games/games.component';
import { GameComponent } from './games/game/game.component';
import { RoomsComponent } from './rooms/rooms.component';
import {LoginComponent} from './auth/login/login.component';

const appRoutes: Routes = [
  { path: '', redirectTo: '/rooms', pathMatch: 'full' },
  { path: 'rooms', component: RoomsComponent },
  { path: 'room/:name/games', component: GamesComponent },
  { path: 'room/:name/games/game:id', component: GameComponent },
  { path: 'login', component: LoginComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(appRoutes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
