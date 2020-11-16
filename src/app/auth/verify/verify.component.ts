import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, UrlSegment, Params } from '@angular/router';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-verify',
  templateUrl: './verify.component.html',
  styleUrls: ['./verify.component.css']
})
export class VerifyComponent implements OnInit {
  mode: 'forgot' | 'reset' = 'forgot';
  forgotForm: FormGroup;
  spinner = false;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private authService: AuthService
  ) {
    document.title = 'Recover | Fahad Hossain';
  }

  ngOnInit() {
    this.forgotForm = new FormGroup({
      email: new FormControl(null, {
        validators: [Validators.required, Validators.email]
      })
    });
    this.route.url.subscribe((url: UrlSegment[]) => {
      this.mode = url[0].path as 'forgot' | 'reset';
      if (this.mode === 'forgot') {
        this.route.queryParamMap.subscribe((query: Params) => {
          if (query.params.email) {
            this.forgotForm.patchValue({
              email: query.params.email
            });
          }
        });
      }
    });
  }

  onForgotSubmition() {
    if (this.forgotForm.invalid) {
      return;
    }
    this.authService
      .forgot(this.forgotForm.value.email)
      .subscribe((res) => console.log(res), (error) => console.log(error));
  }

  emailError(control: FormControl) {
    return control.hasError('required')
      ? 'You must enter an email'
      : control.hasError('email')
      ? 'You must enter a valid email'
      : '';
  }
}
