import {Injectable} from '@angular/core';
import {User} from '../models/user.model';
import {Observable} from 'rxjs';
import {Router} from '@angular/router';

@Injectable({providedIn: 'root'})
export class LoginService {
  users: User[] = [{
    _id: '123',
    username: 'jankowalski',
    email: '123@123.com',
    password: '123',
    rooms_id: []
  }];
  currentUser = null;
  isUserLoggedIn = false;

  constructor(public router: Router) {
  }

  public createUser(user: User): number {
    this.users.push(user);
    return 0;
  }
  public login(user: User): number {
    for(const existingUser of this.users) {
      if(user.email === existingUser.email && user.password === existingUser.password) {
        this.currentUser = existingUser;
        this.isUserLoggedIn = true;
        return 0;
      }
    }
    return 1;
  }
  public getIsUserLoggedIn(): boolean {
    return this.isUserLoggedIn;
  }
  public getUsername(): string {
    return this.currentUser.username;
  }
  public logOut(): void {
    this.isUserLoggedIn = false;
    this.currentUser = null;
    this.router.navigateByUrl('/login');
  }
}
