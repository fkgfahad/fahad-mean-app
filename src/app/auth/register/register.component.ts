import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import {
  trigger,
  transition,
  query,
  animate,
  style
} from '@angular/animations';

import { AuthService } from '../auth.service';
import { HelperService } from '../../services/helper.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
  animations: [
    trigger('animationRegister', [
      transition('* => *', [
        query(
          'mat-card',
          style({
            transform: 'scale(0) translateY(100%)',
            opacity: 0
          })
        ),
        query(
          'mat-card',
          animate(
            300,
            style({
              transform: 'scale(1) translateY(0)',
              opacity: 1
            })
          )
        )
      ])
    ])
  ]
})
export class RegisterComponent implements OnInit {
  nameForm: FormGroup;
  emailForm: FormGroup;
  passwordForm: FormGroup;
  cpasswordForm: FormGroup;
  inputType: 'text' | 'password' = 'password';
  spinner = false;
  isLogged = false;

  constructor(private authService: AuthService, public helper: HelperService) {
    document.title = 'User Signup | Fahad Hossain';
  }

  ngOnInit() {
    this.nameForm = new FormGroup({
      name: new FormControl(null, { validators: Validators.required })
    });
    this.emailForm = new FormGroup({
      email: new FormControl(null, {
        validators: [Validators.required, Validators.email]
      })
    });
    this.passwordForm = new FormGroup({
      password: new FormControl(null, {
        validators: [
          Validators.required,
          Validators.minLength(8),
          Validators.maxLength(32),
          Validators.pattern(/^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z]).{8,32}$/)
        ]
      })
    });
    this.cpasswordForm = new FormGroup({
      cpassword: new FormControl(null, {
        validators: [
          Validators.required,
          Validators.minLength(8),
          Validators.maxLength(32),
          Validators.pattern(/^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z]).{8,32}$/)
        ]
      })
    });
  }

  onRegister() {
    if (
      this.nameForm.invalid ||
      this.emailForm.invalid ||
      this.passwordForm.invalid ||
      this.cpasswordForm.invalid ||
      this.passwordForm.get('password').value !==
        this.cpasswordForm.get('cpassword').value
    ) {
      return;
    }
    this.spinner = true;
    this.authService
      .signup(
        this.nameForm.value.name,
        this.emailForm.value.email,
        this.passwordForm.value.password,
        this.cpasswordForm.value.cpassword
      )
      .subscribe(
        (result) => {
          this.spinner = false;
          if (result.message) {
            this.helper.openSnackbar(result.message);
          }
        },
        (error) => {
          console.log(error);
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

  onFocus(inputId: string) {
    const inputElement = document.getElementById(inputId);
    setTimeout(() => {
      inputElement.focus();
    }, 300);
  }
}
