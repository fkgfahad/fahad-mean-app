import { Component, OnInit } from '@angular/core';
import { PageEvent } from '@angular/material';
import {
  trigger,
  transition,
  query,
  animate,
  style,
  stagger
} from '@angular/animations';

import { TestimonialService } from '../testimonial.service';
import { Testimonial } from '../../models/testimonial.model';

@Component({
  selector: 'app-testimonials',
  templateUrl: './testimonials.component.html',
  styleUrls: ['./testimonials.component.css'],
  animations: [
    trigger('tstAnimate', [
      transition('* => *', [
        query(
          'p',
          style({
            transform: 'rotate(-45deg) translate(50%, -50%)',
            opacity: 0
          })
        ),
        query(
          'p',
          stagger(700, [
            animate(
              700,
              style({
                transform: 'rotate(0) translate(0)',
                opacity: 1
              })
            )
          ])
        )
      ])
    ])
  ]
})
export class TestimonialsComponent implements OnInit {
  testimonials: Testimonial[];
  tstSpinner = false;
  paginator = {
    length: 0,
    pageSize: 3,
    pageSizeOptions: [3, 6, 10],
    pageIndex: 0
  };

  constructor(private tstService: TestimonialService) {
    document.title = 'Spceechs of clients | Fahad Hossain';
  }

  ngOnInit() {
    scrollTo({
      top: 0,
      behavior: 'smooth'
    });

    this.tstSpinner = true;
    this.tstService
      .getTestimonials(this.paginator.pageSize, this.paginator.pageIndex)
      .subscribe(
        (data) => {
          this.testimonials = data.testimonials;
          this.paginator.length = data.total;
          this.tstSpinner = false;
        },
        (error) => {
          console.log(error);
          this.tstSpinner = false;
        }
      );
  }

  onPaginate(event: PageEvent) {
    this.tstSpinner = true;
    this.paginator.pageSize = event.pageSize;
    this.paginator.pageIndex = event.pageIndex;
    this.tstService
      .getTestimonials(this.paginator.pageSize, this.paginator.pageIndex)
      .subscribe(
        (data) => {
          this.testimonials = data.testimonials;
          this.paginator.length = data.total;
          this.tstSpinner = false;
        },
        (error) => {
          console.log(error);
          this.tstSpinner = false;
        }
      );
  }
}
