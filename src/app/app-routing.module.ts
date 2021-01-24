import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RoomsComponent } from './rooms/rooms.component';
import { LoginComponent } from './auth/login/login.component';
import { SignupComponent } from './auth/signup/signup.component';
import { MenuComponent } from './menu/menu.component';
import {AuthGuard} from '../shared/guards/auth.guard';
import { MyStatsComponent } from './my-stats/my-stats.component';

const appRoutes: Routes = [
  { path: '', redirectTo: '/login', pathMatch: 'full' },  //jezeli to sie znalazlo na masterze to sorka, zmiencie z powrotem na  redirectTo: '/login'
  { path: 'login', component: LoginComponent },
  { path: 'signup', component: SignupComponent },
  { path: 'rooms', component: RoomsComponent, canActivate: [AuthGuard] },
  { path: ':name/games', component: MenuComponent, canActivate: [AuthGuard] },
  { path: ':name/:gameName', component: MenuComponent, canActivate: [AuthGuard] },
  { path: 'my-stats', component: MyStatsComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(appRoutes)],
  exports: [RouterModule],
  providers: [AuthGuard],
})
export class AppRoutingModule {}
