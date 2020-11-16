import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';

import { AuthService } from './auth/auth.service';
import { AppState } from './store/app.reducers';
import { Logout } from './auth/store/auth.actions';

@Component({
  selector: 'fahad-hossain',
  template: `
    <app-navbar></app-navbar>
    <div
      style="position: relative;margin-top: -440px;z-index: 1;min-height: 90vh;"
    >
      <router-outlet (activate)="changeOfRoutes()"></router-outlet>
    </div>
    <app-footer></app-footer>
  `
})
export class AppComponent implements OnInit {
  constructor(
    private authService: AuthService,
    private store: Store<AppState>,
    private router: Router
  ) {}
  ngOnInit() {
    this.authService.autoAuthUser();
  }

  changeOfRoutes() {
    this.router.events.subscribe((event: any) => {
      if (!localStorage.getItem('$.auth')) {
        this.store.dispatch(new Logout());
      }
    });
  }
}
