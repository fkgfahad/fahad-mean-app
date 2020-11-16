import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import {
  trigger,
  transition,
  query,
  animate,
  style
} from '@angular/animations';

import { AppState } from '../../store/app.reducers';
import { AuthState } from '../../auth/store/auth.reducer';
import { User } from '../../models/user.model';

@Component({
  selector: 'app-user',
  templateUrl: 'user.component.html',
  styleUrls: ['user.component.css'],
  animations: [
    trigger('rotateCard', [
      transition('* => *', [
        query(
          'mat-card',
          style({
            transform:
              'rotateX(12deg) rotateY(-35deg) translate(0) scale(0) skew(90deg)',
            opacity: 0.5
          })
        ),
        query(
          'mat-card',
          animate(
            800,
            style({
              transform:
                'rotateX(12deg) rotateY(-35deg) translate(-50%, -50%) scale(1) skew(0deg)',
              opacity: 1
            })
          )
        )
      ])
    ])
  ]
})
export class UserComponent implements OnInit {
  user: User;
  constructor(private store: Store<AppState>) {
    document.title = 'User | Fahad Hossain';
  }

  ngOnInit() {
    document.title = 'User | Fahad Hossain';
    this.store.select('auth').subscribe((authData: AuthState) => {
      if (authData.isAuth) {
        this.user = authData.user;
        document.title = authData.user.name + ' | Fahad Hossain';
      }
    });
  }

  greeting() {
    if (new Date().getHours() <= 3) {
      return 'Good dawn';
    } else if (new Date().getHours() <= 11) {
      return 'Good morning';
    } else if (new Date().getHours() <= 18) {
      return 'Good afternoon';
    } else if (new Date().getHours() < 20) {
      return 'Good evening';
    } else if (new Date().getHours() >= 20) {
      return 'Good night';
    } else {
      return 'Good day';
    }
  }
}
