import { Injectable, ɵɵresolveBody } from '@angular/core';
import { User } from '../models/user.model';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { Subject } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class LoginService {
  private isAuthenticated = false;
  private token: string;
  private tokenTimer: NodeJS.Timer;
  private authStatusListener = new Subject<boolean>();

  private currentUser = null;
  private isUserLoggedIn = false;

  constructor(public router: Router, private http: HttpClient) {}

  public createUser(user: User): number {
    console.log(user);
    this.http
      .post<{ message: string }>('http://localhost:3000/api/users/signup', user)
      .subscribe((responseData) => {
        console.log(responseData.message);
      });
      console.log('end of create user');
    return 0; // user created

    
  }

  public login(user: User): Promise<number> {
    return new Promise((resolve, reject) => {
      this.http
        .post<{
          message: string;
          token: string;
          expiresIn: number;
          user: User;
        }>('http://localhost:3000/api/users/login', user, {
          observe: 'body',
          responseType: 'json',
        })
        .subscribe((response) => {
          this.currentUser = response.user;
          this.isUserLoggedIn = true;
          const token = response.token;
          this.token = token;
          if (token) {
            const expiresInDuration = response.expiresIn;
            this.setAuthTimer(expiresInDuration);
            this.isAuthenticated = true;
            this.authStatusListener.next(true);
            const now = new Date();
            const expirationDate = new Date(
              now.getTime() + expiresInDuration * 1000
            );
            this.saveAuthData(token, expirationDate);
            this.router.navigate(['/rooms']);
          }
          resolve(0);
        });
    });
  }

  public getIsUserLoggedIn(): boolean {
    return this.isUserLoggedIn;
  }

  public getIsAuth() {
    return this.isAuthenticated;
  }

  public getUsername(): string {
    if (this.currentUser !== null) return this.currentUser.username;
  }

  public getToken() {
    return this.token;
  }

  public getAuthStatusListener() {
    return this.authStatusListener.asObservable();
  }

  public autoAuthUser() {
    const authInformation = this.getAuthData();
    if (!authInformation) {
      return;
    }
    const now = new Date();
    const expireTime = new Date(authInformation.expirationDate);
    const expiresIn = expireTime.getTime() - now.getTime();
    if (expiresIn > 0) {
      this.token = authInformation.token;
      this.isAuthenticated = true;
      this.setAuthTimer(expiresIn / 1000);
      this.authStatusListener.next(true);
    }
  }

  public getCurrentUser(): User {

    return this.currentUser;
  }

  public logOut(): void {
    this.token = null;
    this.isAuthenticated = false;
    this.authStatusListener.next(false);
    this.isUserLoggedIn = false;
    this.currentUser = null;
    clearTimeout(this.tokenTimer);
    this.clearAuthData();
    this.router.navigateByUrl('/login');
  }

  private setAuthTimer(duration: number) {
    this.tokenTimer = setTimeout(() => {
      this.logOut();
    }, duration * 1000);
  }

  private saveAuthData(token: string, expirationDate: Date) {
    localStorage.setItem('token', token);
    localStorage.setItem('expiration', expirationDate.toISOString());
  }

  private clearAuthData() {
    localStorage.removeItem('token');
    localStorage.removeItem('expiration');
  }

  private getAuthData() {
    const token = localStorage.getItem('token');
    const expirationDate = localStorage.getItem('expiration');
    if (!token || !expirationDate) {
      return;
    }
    return {
      token: token,
      expirationDate: expirationDate,
    };
  }
}
