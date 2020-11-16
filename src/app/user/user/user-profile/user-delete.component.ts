import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material';
import { Store } from '@ngrx/store';

import { AppState } from '../../../store/app.reducers';
import { AuthState } from '../../../auth/store/auth.reducer';
import { User } from '../../../models/user.model';

@Component({
  selector: 'app-delete-dialog',
  template: `
    <h1 mat-dialog-title>Hi {{ user?.name }}</h1>
    <mat-divider></mat-divider>
    <div mat-dialog-content>
      <p>Are you sure to permanetly delete your profile?</p>
    </div>
    <mat-divider></mat-divider>
    <div mat-dialog-actions>
      <button mat-stroked-button color="primary" (click)="onNoClick()">
        No Thanks
      </button>
      <span class="spacer"></span>
      <button
        mat-raised-button
        color="warn"
        cdkFocusInitial
        (click)="onDelete()"
      >
        Delete
      </button>
    </div>
  `
})
export class DeleteDialogComponent implements OnInit {
  user: User;
  constructor(
    private store: Store<AppState>,
    private dialogRef: MatDialogRef<DeleteDialogComponent>
  ) {}
  ngOnInit() {
    this.store.select('auth').subscribe((authData: AuthState) => {
      this.user = authData.user;
    });
  }

  onNoClick() {
    this.dialogRef.close();
  }

  onDelete() {
    console.log('delete profile');
  }
}
