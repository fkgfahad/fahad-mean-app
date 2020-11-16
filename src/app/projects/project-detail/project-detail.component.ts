import { Component, OnInit, ViewChild, OnDestroy } from '@angular/core';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { MatDrawer } from '@angular/material';

import { PortfolioService } from '../portfolios.service';
import { Portfolio } from '../../models/portfolio.model';
import { Skill } from '../../models/skill.model';
import { HelperService } from '../../services/helper.service';

@Component({
  selector: 'app-project-detail',
  templateUrl: './project-detail.component.html',
  styleUrls: ['./project-detail.component.css']
})
export class ProjectDetailComponent implements OnInit, OnDestroy {
  @ViewChild('detailDrawer') detailDrawer: MatDrawer;
  portfolio: Portfolio;
  skills: Skill[];
  skillTypes: Skill['type'][] = [
    'frontend',
    'backend',
    'database',
    'tool',
    'cloud'
  ];

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private portfolioService: PortfolioService,
    public helper: HelperService
  ) {
    document.title = 'Project title | Fahad Hossain';
  }

  ngOnInit() {
    this.route.paramMap.subscribe((paramMap: ParamMap) => {
      if (paramMap.has('porjectId')) {
        this.portfolioService
          .getAPortfolio(paramMap.get('porjectId'))
          .subscribe((portfolio: Portfolio) => {
            this.portfolio = portfolio;
            this.detailDrawer.open();
          });
      }
    });
  }

  closeDrawer() {
    this.detailDrawer.close();
    setTimeout(() => {
      this.router.navigate(['../'], { relativeTo: this.route });
    }, 200);
  }

  ngOnDestroy() {
    document.title = 'Portfolio Projects | Fahad Hossain';
  }
}
