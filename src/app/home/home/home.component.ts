import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import {
  trigger,
  transition,
  query,
  style,
  animate
} from '@angular/animations';

import { HelperService } from '../../services/helper.service';
import { PortfolioService } from '../../projects/portfolios.service';
import { Portfolio } from '../../models/portfolio.model';
import { HomeService } from '../home.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
  animations: [
    trigger('animationLogin', [
      transition('* => *', [
        query(
          '[rollDown]',
          style({
            transform: 'translateY(-200%)',
            opacity: 0
          })
        ),
        query(
          '[rollDown]',
          animate(
            600,
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
export class HomeComponent implements OnInit {
  nlForm: FormGroup;
  portfolios: Portfolio[];
  pfSpinner = false;
  nlSpinner = false;
  nlThanks = false;
  nlMessage: { message: string; color: string };

  constructor(
    public helper: HelperService,
    private portfolioService: PortfolioService,
    private homeService: HomeService
  ) {
    document.title = 'Fahad Hossain | Angular & MEAN Stack Developer';
  }

  ngOnInit() {
    scrollTo({
      top: 0,
      behavior: 'smooth'
    });

    this.nlForm = new FormGroup({
      name: new FormControl(null, { validators: Validators.required }),
      email: new FormControl(null, {
        validators: [Validators.required, Validators.email]
      })
    });

    this.pfSpinner = true;
    this.portfolioService.getPortfolios(5, 1).subscribe((data) => {
      this.pfSpinner = false;
      this.portfolios = data.portfolios;
    });
  }

  onNlSubmit() {
    if (this.nlForm.invalid) {
      return;
    }
    this.nlSpinner = true;
    this.homeService
      .submitNewsletter(this.nlForm.value.name, this.nlForm.value.email)
      .subscribe(
        (res: { message: string; color: string }) => {
          this.nlSpinner = false;
          this.nlThanks = true;
          this.nlMessage = res;
        },
        (error) => {
          this.helper.openSnackbar(error.error.message);
          this.nlSpinner = false;
        }
      );
  }

  logginOffset() {}
}
