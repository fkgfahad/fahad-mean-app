import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';

import { UserService } from '../../../user.service';
import { Project } from '../../../../models/project.model';

@Component({
  selector: 'app-project',
  templateUrl: './project.component.html',
  styleUrls: ['./project.component.css']
})
export class ProjectComponent implements OnInit {
  project: Project;
  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private userService: UserService
  ) {}

  ngOnInit() {
    document.title = '<project> | Fahad Hossain';
    this.route.paramMap.subscribe((paramMap: ParamMap) => {
      if (paramMap.has('projectId')) {
        this.userService
          .getProject(paramMap.get('projectId'))
          .subscribe((project: Project) => {
            document.title = project.appType + ' | Fahad Hossain';
          });
      } else {
        this.router.navigate(['../'], { relativeTo: this.route });
      }
    });
  }
}
