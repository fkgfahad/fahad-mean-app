import { HttpClient } from '@angular/common/http';
import { map, catchError } from 'rxjs/operators';
import { Contact } from '../models/contact.model';
import { throwError } from 'rxjs';
import { Injectable } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class ContactService {
  constructor(private http: HttpClient) {}

  getContacts() {
    return this.http
      .get<{ contacts: Contact[] }>('http://127.0.0.1:3000/api/contact')
      .pipe(
        map((res) => res.contacts),
        catchError((error) => throwError(error))
      );
  }

  sendMessage(name: string, email: string, message: string, letter: boolean) {
    return this.http
      .post<{ message: string; color: string }>(
        'http://127.0.0.1:3000/api/message',
        {
          date: new Date(),
          name,
          email,
          message,
          letter
        }
      )
      .pipe(
        map((res) => res),
        catchError((error) => throwError(error))
      );
  }
}
