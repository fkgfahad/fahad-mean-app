import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map, catchError } from 'rxjs/operators';

import { throwError } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class HomeService {
  constructor(private http: HttpClient) {}

  submitNewsletter(name: string, email: string) {
    return this.http
      .post<{ message: string; color: string }>(
        'http://127.0.0.1:3000/api/newsletter',
        {
          date: Date.now(),
          name,
          email
        }
      )
      .pipe(
        map((res) => res),
        catchError((error) => throwError(error))
      );
  }
}
