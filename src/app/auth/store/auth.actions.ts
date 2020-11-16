import { Action } from '@ngrx/store';

import { User } from '../../models/user.model';

export const LOGIN = 'LOGIN';
export const LOGOUT = 'LOGOUT';

export class Login implements Action {
  readonly type = LOGIN;
  constructor(
    public payload: { isAuth: boolean; isAdmin: boolean; user: User }
  ) {}
}

export class Logout implements Action {
  readonly type = LOGOUT;
}

export type AuthActions = Login | Logout;
