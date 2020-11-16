import * as AuthActions from './auth.actions';
import { User } from '../../models/user.model';

export interface AuthState {
  isAuth: boolean;
  isAdmin: boolean;
  user: User;
}

const initState: AuthState = {
  isAuth: false,
  isAdmin: false,
  user: null
};

export function authReducer(
  state = initState,
  action: AuthActions.AuthActions
) {
  switch (action.type) {
    case AuthActions.LOGIN:
      return {
        ...state,
        isAuth: action.payload.isAuth,
        isAdmin: action.payload.isAdmin,
        user: action.payload.user
      };
    case AuthActions.LOGOUT:
      return {
        ...state,
        isAuth: false,
        isAdmin: false,
        user: null
      };
    default:
      return state;
  }
}
