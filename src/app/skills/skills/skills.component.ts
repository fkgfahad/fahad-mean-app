import { Component, OnInit } from '@angular/core';

import { HelperService } from '../../services/helper.service';
import { Skill } from '../../models/skill.model';
import { SkillService } from '../skill.service';
import {
  trigger,
  transition,
  query,
  style,
  stagger,
  animate
} from '@angular/animations';

@Component({
  selector: 'app-skills',
  templateUrl: './skills.component.html',
  styleUrls: ['./skills.component.css'],
  animations: [
    trigger('skillsAnimate', [
      transition('* => *', [
        query(
          '[skills]',
          style({
            transform: 'translateX(-100%)',
            opacity: 0
          })
        ),
        query(
          '[skills]',
          stagger(600, [
            animate(
              600,
              style({
                transform: 'translateX(0)',
                opacity: 1
              })
            )
          ])
        )
      ])
    ])
  ]
})
export class SkillsComponent implements OnInit {
  skills: Skill[];
  skillTypes: Skill['type'][] = [
    'frontend',
    'backend',
    'database',
    'tool',
    'cloud'
  ];
  constructor(
    public helper: HelperService,
    private skillService: SkillService
  ) {
    document.title = 'Skills | Fahad Hossain';
  }

  ngOnInit() {
    scrollTo({
      top: 0,
      behavior: 'smooth'
    });

    this.skillService
      .getSkills()
      .subscribe((skills: Skill[]) => (this.skills = skills));
  }

  getFeaturedSkills(type: Skill['type']) {
    return this.skills.filter((skill: Skill) => skill.type === type);
  }
}
