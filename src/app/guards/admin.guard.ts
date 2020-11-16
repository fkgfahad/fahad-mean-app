import { Injectable } from '@angular/core';
import {
  CanActivate,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
  Router
} from '@angular/router';
import { Observable } from 'rxjs';

import { Store } from '@ngrx/store';
import { AppState } from '../store/app.reducers';
import { AuthState } from '../auth/store/auth.reducer';
import { AuthService } from '../auth/auth.service';

@Injectable()
export class AdminGuard implements CanActivate {
  isAdmin: boolean;
  constructor(
    private store: Store<AppState>,
    private router: Router,
    private auth: AuthService
  ) {}
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean> | Promise<boolean> | boolean {
    this.store.select('auth').subscribe((authState: AuthState) => {
      this.isAdmin = authState.isAdmin;
    });
    this.auth.setRedirect(state.url);
    if (!this.isAdmin) {
      this.router.navigate(['/auth', 'login']);
    }
    return this.isAdmin;
  }
}
