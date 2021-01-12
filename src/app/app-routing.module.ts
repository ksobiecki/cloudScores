import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { GamesComponent } from './games/games.component';
import { RoomsComponent } from './rooms/rooms.component';
import { StatisticsComponent } from './statistics/statistics.component';

const appRoutes: Routes = [
  { path: '', redirectTo: '/rooms', pathMatch: 'full' },
  { path: 'rooms', component: RoomsComponent },
  { path: 'room/:name/games', component: GamesComponent },
  { path: 'room/:name/games/:id', component: StatisticsComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(appRoutes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
