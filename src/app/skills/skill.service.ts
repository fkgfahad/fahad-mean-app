import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { catchError, map } from 'rxjs/operators';
import { throwError } from 'rxjs';

import { Skill } from '../models/skill.model';

@Injectable()
export class SkillService {
  constructor(private http: HttpClient) {}

  getSkills() {
    return this.http
      .get<{ skills: Skill[] }>('http://127.0.0.1:3000/api/skill')
      .pipe(
        map((res) => res.skills),
        catchError((error) => throwError(error))
      );
  }
}
