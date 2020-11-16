import { Component, OnInit } from '@angular/core';
import { PageEvent } from '@angular/material';
import {
  trigger,
  transition,
  query,
  style,
  stagger,
  animate
} from '@angular/animations';

import { Portfolio } from '../../models/portfolio.model';
import { PortfolioService } from '../portfolios.service';

@Component({
  selector: 'app-projects',
  templateUrl: './projects.component.html',
  styleUrls: ['./projects.component.css'],
  animations: [
    trigger('projectAnimation', [
      transition('* => *', [
        query(
          '#projectId',
          style({
            transform: 'translateX(-100%)',
            opacity: 0
          })
        ),
        query(
          '#projectId',
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
export class ProjectsComponent implements OnInit {
  spinner = false;
  projects: Portfolio[];
  images: string[] = [
    'https://www.childrensmuseum.org/sites/default/files/ExhibitsIconsPlaces_Carousel_Large_003.jpg',
    'http://wowslider.com/sliders/demo-93/data1/images/sunset.jpg',
    'https://www.w3.org/TR/wai-aria-practices/examples/carousel/carousel-1/images/lands-endslide__800x600.jpg'
  ];
  paginator = {
    length: 0,
    pageSize: 5,
    pageSizeOptions: [5, 10, 20],
    pageIndex: 0
  };

  customOptions: any = {
    loop: true,
    autoplay: true,
    mouseDrag: true,
    touchDrag: true,
    pullDrag: true,
    dots: true,
    navSpeed: 1000,
    navText: ['', ''],
    responsive: {
      0: {
        items: 1
      },
      400: {
        items: 1
      },
      740: {
        items: 1
      },
      940: {
        items: 1
      }
    },
    nav: true
  };
  constructor(private portfolioService: PortfolioService) {
    document.title = 'Projects | Fahad Hossain';
  }

  ngOnInit() {
    scrollTo({
      top: 0,
      behavior: 'smooth'
    });
    this.spinner = true;
    this.portfolioService
      .getPortfolios(this.paginator.pageSize, this.paginator.pageIndex + 1)
      .subscribe((data) => {
        this.paginator.length = data.total;
        this.projects = data.portfolios;
        this.spinner = false;
      });
  }

  onPaginator(event: PageEvent) {
    this.spinner = true;
    this.paginator.pageSize = event.pageSize;
    this.paginator.pageIndex = event.pageIndex + 1;
    this.portfolioService
      .getPortfolios(this.paginator.pageSize, this.paginator.pageIndex)
      .subscribe((data) => {
        this.paginator.length = data.total;
        this.projects = data.portfolios;
        this.spinner = false;
      });
  }
}
