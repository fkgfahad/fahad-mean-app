import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import {
  trigger,
  style,
  transition,
  animate,
  query
} from '@angular/animations';

import { AuthService } from '../auth.service';
import { HelperService } from '../../services/helper.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  animations: [
    trigger('animationLogin', [
      transition('* => *', [
        query(
          'mat-card',
          style({
            transform: 'translateY(-100%)',
            opacity: 0
          })
        ),
        query(
          'mat-card',
          animate(
            300,
            style({
              transform: 'translateY(0)',
              opacity: 1
            })
          )
        )
      ])
    ])
  ]
})
export class LoginComponent implements OnInit {
  state: 'from' | 'fade' = 'from';
  loginForm: FormGroup;
  inputType: 'password' | 'text' = 'password';
  spinner = false;

  constructor(private authService: AuthService, public helper: HelperService) {
    document.title = 'User Login | Fahad Hossain';
  }

  ngOnInit() {
    this.loginForm = new FormGroup({
      email: new FormControl(null, {
        validators: [Validators.required, Validators.email]
      }),
      password: new FormControl(null, {
        validators: [
          Validators.required,
          Validators.minLength(8),
          Validators.maxLength(32),
          Validators.pattern(/^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z]).{8,32}$/)
        ]
      })
    });
  }

  onLogin() {
    if (this.loginForm.invalid) {
      return;
    }
    this.spinner = true;
    this.authService
      .login(this.loginForm.value.email, this.loginForm.value.password)
      .subscribe(
        (res) => {
          this.spinner = false;
          if (res.message) {
            this.helper.openSnackbar(res.message);
          }
        },
        (error) => {
          this.spinner = false;
          this.helper.openSnackbar(error.error.message);
        }
      );
  }

  emailError(control: FormControl) {
    return control.hasError('required')
      ? 'You must enter an email'
      : control.hasError('email')
      ? 'You must enter a valid email'
      : '';
  }

  passError(control: FormControl) {
    if (control.hasError('required')) {
      return 'You must enter your password.';
    } else if (control.hasError('pattern') && control.hasError('maxlength')) {
      return 'Your password must contain a-z, A-Z & 0-9 and shouldn\'t be more than 32 characters.';
    } else if (control.hasError('pattern') && control.hasError('minlength')) {
      return 'Your password must contain a-z, A-Z & 0-9 and shouldn\'t be less than 8 characters.';
    } else if (control.hasError('pattern')) {
      return 'Your password must contain a-z, A-Z & 0-9.';
    } else if (control.hasError('maxlength')) {
      return 'Your password should not be more than 32 characters.';
    } else if (control.hasError('minlength')) {
      return 'Your password should not be less than 8 characters.';
    } else {
      return 'Invalid password';
    }
  }

  changeType() {
    this.inputType === 'text'
      ? (this.inputType = 'password')
      : (this.inputType = 'text');
  }
}
