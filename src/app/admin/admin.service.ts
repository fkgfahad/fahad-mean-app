import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map, catchError } from 'rxjs/operators';
import { throwError } from 'rxjs';

import { Message } from '../models/message.model';
import { User } from '../models/user.model';
import { Newsletter } from '../models/newsletter.model';
import { Testimonial } from '../models/testimonial.model';
import { Portfolio } from '../models/portfolio.model';
import { Skill } from '../models/skill.model';

@Injectable()
export class AdminService {
  constructor(private http: HttpClient) {}

  getUsers() {
    return this.http
      .get<{ users: User[] }>('http://127.0.0.1:3000/api/user/users')
      .pipe(
        map((res) => res.users),
        catchError((error) => throwError(error))
      );
  }

  getUser(userId: string) {
    return this.http
      .get<{ user: User }>('http://127.0.0.1:3000/api/user/' + userId)
      .pipe(
        map((res) => res.user),
        catchError((error) => throwError(error))
      );
  }

  getMessages() {
    return this.http
      .get<{ messages: Message[] }>('http://127.0.0.1:3000/api/message')
      .pipe(
        map((res) => res.messages),
        catchError((error) => throwError(error))
      );
  }

  getMessage(messageId: string) {
    return this.http
      .get<{ message: Message }>(
        'http://127.0.0.1:3000/api/message/' + messageId
      )
      .pipe(
        map((res) => res.message),
        catchError((error) => throwError(error))
      );
  }

  getNewsletters() {
    return this.http
      .get<{ newsletters: Newsletter[] }>(
        'http://127.0.0.1:3000/api/newsletter'
      )
      .pipe(
        map((res) => res.newsletters),
        catchError((error) => throwError(error))
      );
  }

  saveTestimonial(name: string, speech: string) {
    const newTst: Testimonial = {
      date: new Date(),
      name,
      speech
    };
    return this.http
      .post<{ message: string }>(
        'http://127.0.0.1:3000/api/testimonial',
        newTst
      )
      .pipe(
        map((res) => res.message),
        catchError((error) => throwError(error))
      );
  }

  getTestimonials(pagesize: number, page: number) {
    const query = `?pagesize=${pagesize}&page=${page}`;
    return this.http
      .get<{ testimonials: Testimonial[]; total: number }>(
        'http://127.0.0.1:3000/api/testimonial/admin' + query
      )
      .pipe(
        map((res) => res),
        catchError((error) => throwError(error))
      );
  }

  deleteTestimonial(testimonialId: string) {
    return this.http
      .delete<{ message: string }>(
        'http://127.0.0.1:3000/api/testimonial/' + testimonialId
      )
      .pipe(
        map((res) => res.message),
        catchError((error) => throwError(error))
      );
  }

  editTestimonialStatus(testimonialId: string, status: boolean) {
    return this.http
      .put<{ message: string; show: boolean }>(
        'http://127.0.0.1:3000/api/testimonial/status',
        {
          _id: testimonialId,
          status
        }
      )
      .pipe(
        map((res) => res),
        catchError((error) => throwError(error))
      );
  }

  getPortfolios(pagesize: number, page: number) {
    const query = `?pagesize=${pagesize}&page=${page}`;
    return this.http
      .get<{ portfolios: Portfolio[]; total: number }>(
        'http://127.0.0.1:3000/api/portfolio/admin' + query
      )
      .pipe(
        map((res) => res),
        catchError((error) => throwError(error))
      );
  }

  newPortfolio(
    title: string,
    subtitle: string,
    detail: string,
    images: File[],
    skills: string[],
    sourceCode: string
  ) {
    const formData = new FormData();
    formData.append('date', new Date().toISOString());
    formData.append('title', title);
    formData.append('subtitle', subtitle);
    formData.append('detail', detail);
    for (const image of images) {
      formData.append('images', image);
    }
    for (const skill of skills) {
      formData.append('skills', skill);
    }
    formData.append('sourceCode', sourceCode);
    return this.http.post('http://127.0.0.1:3000/api/portfolio', formData).pipe(
      map((res) => res),
      catchError((error) => throwError(error))
    );
  }

  getSkills() {
    return this.http
      .get<{ skills: Skill[] }>('http://127.0.0.1:3000/api/skill')
      .pipe(
        map((res) => res.skills),
        catchError((error) => throwError(error))
      );
  }
}
