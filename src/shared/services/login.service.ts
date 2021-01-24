import { Injectable, ɵɵresolveBody } from '@angular/core';
import { User } from '../models/user.model';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';

@Injectable({ providedIn: 'root' })
export class LoginService {
  private currentUser = null;
  private isUserLoggedIn = false;

  constructor(public router: Router, private http: HttpClient) {}

  public createUser(user: User): number {
    this.http
      .post<{ message: string }>('http://localhost:3000/api/users', user)
      .subscribe((responseData) => {
        console.log(responseData.message);
      });
    return 0; // user created
  }

  public login(user: User): Promise<number> {
    return new Promise((resolve, reject) => {
      this.http
        .post<{ message: string }>(
          'http://localhost:3000/api/users/login',
          user,
          {
            observe: 'body',
            responseType: 'json',
          }
        )
        .subscribe((postData: any) => {
          if (
            user.email === postData.user.email &&
            user.password === postData.user.password
          ) {
            this.currentUser = postData.user;
            this.isUserLoggedIn = true;
            resolve(0);
          }
        });
    });
  }

  public getIsUserLoggedIn(): boolean {
    return this.isUserLoggedIn;
  }

  public getUsername(): string {
    if (this.currentUser !== null) return this.currentUser.username;
  }


  public logOut(): void {
    this.isUserLoggedIn = false;
    this.currentUser = null;
    this.router.navigateByUrl('/login');
  }
}
