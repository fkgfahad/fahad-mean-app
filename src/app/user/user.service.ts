import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable()
export class UserService {
  constructor(private http: HttpClient) {}

  getMessage() {}

  getProjects() {}

  getProject(projectId: string) {
    return this.http.get('');
  }
}
