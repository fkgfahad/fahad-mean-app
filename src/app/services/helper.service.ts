import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material';

import { Skill } from '../models/skill.model';

@Injectable()
export class HelperService {
  constructor(private snackBar: MatSnackBar) {}

  formatTime(time: number) {
    return;
  }

  openSnackbar(message: string) {
    this.snackBar.open(message, 'Dismiss', {
      duration: 5000,
      direction: 'ltr',
      verticalPosition: 'top',
      horizontalPosition: 'center'
    });
  }

  scrollTo(offset: number) {
    scrollTo({
      top: offset,
      behavior: 'smooth'
    });
  }

  sortSkills(skills: Skill[]) {
    return skills.sort((a, b) => a.filter - b.filter);
  }

  getFeaturedSkills(skills: Skill[], type: Skill['type']) {
    return skills.filter((skill: Skill) => skill.type === type);
  }
}
