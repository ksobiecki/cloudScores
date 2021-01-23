import { Injectable } from '@angular/core';
import { User } from '../models/user.model';
import { Router } from '@angular/router';

@Injectable({ providedIn: 'root' })
export class LoginService {
  users: User[] = [
    {
      firstName: 'Jan',
      lastName: 'Kowalski',
      email: '123@123.com',
      password: '123',
    },
  ];
  // currentUser = null;
  // isUserLoggedIn = false;
  currentUser = {
    firstName: 'Jan',
    lastName: 'Kowalski',
    email: '123@123.com',
    password: '123',
  };
  isUserLoggedIn = true;

  constructor(public router: Router) {}

  public createUser(user: User): number {
    this.users.push(user);
    return 0;
  }
  public login(email: string, password: string): number {
    for (const user of this.users) {
      if (user.email === email && user.password === password) {
        this.currentUser = user;
        this.isUserLoggedIn = true;
        return 0;
      }
    }
    return 1;
  }
  public getIsUserLoggedIn(): boolean {
    return this.isUserLoggedIn;
  }
  public logOut(): void {
    this.isUserLoggedIn = false;
    this.currentUser = null;
    this.router.navigateByUrl('/login');
  }
}
