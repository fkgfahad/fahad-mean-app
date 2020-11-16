import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';

import { AdminService } from '../../admin.service';
import { Skill } from '../../../models/skill.model';

@Component({
  selector: 'app-new-portfolio',
  templateUrl: './new-portfolio.component.html',
  styleUrls: ['./new-portfolio.component.css']
})
export class NewPortfolioComponent implements OnInit {
  prtForm: FormGroup;
  skills: Skill[];
  imagesPre = new Array<string>();
  constructor(private adminService: AdminService) {
    document.title = 'New Portfolio | Admin';
  }

  ngOnInit() {
    this.prtForm = new FormGroup({
      title: new FormControl(null),
      subtitle: new FormControl(null),
      detail: new FormControl(null),
      link: new FormControl(null),
      images: new FormControl(null),
      sourceCode: new FormControl(null),
      skills: new FormControl(null)
    });

    this.adminService.getSkills().subscribe(
      (skills: Skill[]) => {
        this.skills = skills;
      },
      (error) => {
        console.log(error);
      }
    );
  }

  onSave() {
    this.adminService
      .newPortfolio(
        this.prtForm.value.title,
        this.prtForm.value.subtitle,
        this.prtForm.value.detail,
        this.prtForm.value.images,
        this.prtForm.value.skills,
        this.prtForm.value.sourceCode
      )
      .subscribe((result) => {
        console.log(result);
      });
  }

  onSelectFiles(event: any) {
    this.prtForm.patchValue({
      images: event.target.files
    });
    this.prtForm.updateValueAndValidity();
    for (const file of event.target.files) {
      const reader = new FileReader();
      reader.onload = () => {
        this.imagesPre.push(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  }
}
