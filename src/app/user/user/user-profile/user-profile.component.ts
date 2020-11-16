import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material';
import { Observable } from 'rxjs';
import { Store } from '@ngrx/store';

import { AppState } from '../../../store/app.reducers';
import { AuthState } from '../../../auth/store/auth.reducer';
import { User } from '../../../models/user.model';
import { DeleteDialogComponent } from './user-delete.component';
import { PasswordChangeComponent } from './password.component';
import { mimeType } from './mimetype.validator';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.css']
})
export class UserProfileComponent implements OnInit {
  authData: Observable<AuthState>;
  user: User;
  userForm: FormGroup;
  imageForm: FormGroup;
  preImg: string;
  editImg = false;
  editMode = false;
  constructor(private store: Store<AppState>, private dialog: MatDialog) {
    document.title = 'User | Fahad Hossain';
  }

  ngOnInit() {
    this.store.select('auth').subscribe((authData: AuthState) => {
      document.title = authData.user.name + ' | Profile';
      this.user = authData.user;
    });
    this.userForm = new FormGroup({
      name: new FormControl(this.user.name, {
        validators: Validators.required
      }),
      username: new FormControl(
        this.user.username ? this.user.username : null,
        {
          validators: Validators.required
        }
      ),
      email: new FormControl(this.user.email, {
        validators: Validators.required
      }),
      company: new FormGroup({
        name: new FormControl(
          this.user.company ? this.user.company.name : null
        ),
        position: new FormControl(
          this.user.company ? this.user.company.position : null
        ),
        city: new FormControl(this.user.company ? this.user.company.city : null)
      })
    });
    this.imageForm = new FormGroup({
      image: new FormControl(null, {
        validators: Validators.required,
        asyncValidators: mimeType
      })
    });
  }

  onImageChange(event: Event) {
    this.editImg = true;
    const file = (event.target as HTMLInputElement).files[0];
    this.imageForm.patchValue({
      image: file
    });
    const reader = new FileReader();
    reader.onload = () => {
      this.preImg = reader.result as string;
    };
    reader.readAsDataURL(file);
    this.imageForm.get('image').updateValueAndValidity();
  }

  onSave() {
    console.log(this.userForm.value);
  }

  onPassword() {
    this.dialog.open(PasswordChangeComponent);
  }

  onDelete() {
    this.dialog.open(DeleteDialogComponent);
  }
}
