import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';

import { AuthService } from '../../auth/auth.service';
import { AppState } from '../../store/app.reducers';
import { User } from '../../models/user.model';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  authState: Observable<{ isAuth: boolean; isAdmin: boolean; user: User }>;
  constructor(
    private authService: AuthService,
    private store: Store<AppState>
  ) {}

  ngOnInit() {
    this.authState = this.store.select('auth');
  }

  onLogout() {
    this.authService.logout();
  }
}
