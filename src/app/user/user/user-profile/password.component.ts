import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material';
import { FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-password-change',
  template: `
    <form [formGroup]="passwordForm" (submit)="onChangePassword()">
      <h3 mat-dialog-title>
        Password Change
      </h3>
      <mat-divider></mat-divider>
      <div mat-dialog-content>
        <div class="pcf">
          <mat-form-field>
            <input
              matInput
              [type]="inputType"
              formControlName="current"
              placeholder="Current password"
            />
          </mat-form-field>
          <mat-form-field>
            <input
              matInput
              [type]="inputType"
              formControlName="password"
              placeholder="New password"
            />
          </mat-form-field>
          <mat-form-field>
            <input
              matInput
              [type]="inputType"
              formControlName="cpassword"
              placeholder="Re-new password"
            />
          </mat-form-field>
        </div>
      </div>
      <mat-divider></mat-divider>
      <div mat-dialog-actions>
        <button
          mat-stroked-button
          type="button"
          color="primary"
          (click)="onNoClick()"
        >
          Cancel
        </button>
        <span class="spacer"></span>
        <button
          mat-raised-button
          color="warn"
          type="submit"
          [disabled]="
            passwordForm.invalid ||
            passwordForm.get('password').value !==
              passwordForm.get('cpassword').value
          "
        >
          Change
        </button>
      </div>
    </form>
  `,
  styles: [
    `
    .pcf {
      width: 100%;
      max-width: 400px;
      margin: 25px auto;
    }
    .pcf mat-form-field {
      margin 10px 0;
      padding: 5px 0;
    }
  `
  ]
})
export class PasswordChangeComponent implements OnInit {
  passwordForm: FormGroup;
  inputType: 'text' | 'password' = 'password';
  constructor(private dialogRef: MatDialogRef<PasswordChangeComponent>) {}
  ngOnInit() {
    this.passwordForm = new FormGroup({
      current: new FormControl(null, {
        validators: [
          Validators.required,
          Validators.pattern(/^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z]).{8,32}$/)
        ]
      }),
      password: new FormControl(null, {
        validators: [
          Validators.required,
          Validators.pattern(/^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z]).{8,32}$/)
        ]
      }),
      cpassword: new FormControl(null, {
        validators: [
          Validators.required,
          Validators.pattern(/^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z]).{8,32}$/)
        ]
      })
    });
  }

  onNoClick() {
    this.dialogRef.close();
  }

  onChangePassword() {
    console.log(this.passwordForm.value);
  }
}
