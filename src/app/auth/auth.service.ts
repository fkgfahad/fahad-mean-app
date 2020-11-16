import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { map, catchError } from 'rxjs/operators';
import { throwError } from 'rxjs';
import { Store } from '@ngrx/store';

import { User } from '../models/user.model';
import { AppState } from '../store/app.reducers';
import { Login, Logout } from './store/auth.actions';

@Injectable({ providedIn: 'root' })
export class AuthService {
  redirectUrl: string = null;
  constructor(
    private http: HttpClient,
    private router: Router,
    private store: Store<AppState>
  ) {}

  forgot(email: string) {
    return this.http
      .post<{ something: any }>('http://127.0.0.1:3000/api/auth/forgot', email)
      .pipe(
        map((res) => {
          return res;
        }),
        catchError((error) => throwError(error))
      );
  }

  login(email: string, password: string) {
    return this.http
      .post<{ user: User; token: string; message?: string }>(
        'http://127.0.0.1:3000/api/auth/login',
        {
          email,
          password
        }
      )
      .pipe(
        map((res) => {
          if (res.token) {
            this.store.dispatch(
              new Login({
                isAuth: true,
                isAdmin: res.user.type === 'admin',
                user: res.user
              })
            );
            localStorage.setItem('$.auth', res.token);
            if (this.redirectUrl) {
              this.router.navigate([this.redirectUrl]);
            } else {
              this.router.navigate(['/user']);
            }
          }
          return res;
        }),
        catchError((error) => throwError(error))
      );
  }

  signup(name: string, email: string, password: string, cpassword: string) {
    return this.http
      .post<{ user: User; token: string; message?: string }>(
        'http://127.0.0.1:3000/api/auth/signup',
        {
          date: new Date(),
          name,
          email,
          password,
          cpassword
        }
      )
      .pipe(
        map((res) => {
          if (res.token) {
            this.store.dispatch(
              new Login({
                isAuth: true,
                isAdmin: res.user.type === 'admin',
                user: res.user
              })
            );
            localStorage.setItem('$.auth', res.token);
            if (this.redirectUrl) {
              this.router.navigate([this.redirectUrl]);
            } else {
              this.router.navigate(['/user']);
            }
          }
          return res;
        }),
        catchError((error) => throwError(error))
      );
  }

  logout() {
    localStorage.removeItem('$.auth');
    this.store.dispatch(new Logout());
    this.router.navigate(['/']);
  }

  autoAuthUser() {
    if (!localStorage.getItem('$.auth')) {
      return;
    }
    this.http
      .get<{ user: User; token: string }>(
        'http://127.0.0.1:3000/api/auth/autosign'
      )
      .subscribe(
        (res) => {
          if (res.token) {
            this.store.dispatch(
              new Login({
                isAuth: true,
                isAdmin: res.user.type === 'admin',
                user: res.user
              })
            );
            localStorage.setItem('$.auth', res.token);
            if (this.redirectUrl) {
              this.router.navigate([this.redirectUrl]);
            }
          }
        },
        () => ''
      );
  }

  setRedirect(url: string) {
    this.redirectUrl = url;
  }
}
