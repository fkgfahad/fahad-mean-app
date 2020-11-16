import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map, catchError } from 'rxjs/operators';
import { throwError } from 'rxjs';

import { Testimonial } from '../models/testimonial.model';

@Injectable({ providedIn: 'root' })
export class TestimonialService {
  constructor(private http: HttpClient) {}

  getTestimonials(pagesize: number, page: number) {
    const query = `?pagesize=${pagesize}&page=${page}`;
    return this.http
      .get<{ testimonials: Testimonial[]; total: number }>(
        'http://127.0.0.1:3000/api/testimonial' + query
      )
      .pipe(
        map((res) => res),
        catchError((error) => throwError(error))
      );
  }
}
