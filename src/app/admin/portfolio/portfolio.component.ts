import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { PageEvent, MatDialog } from '@angular/material';

import { AdminService } from '../admin.service';
import { Portfolio } from '../../models/portfolio.model';
import { NewPortfolioComponent } from './new-portfolio/new-portfolio.component';

@Component({
  selector: 'app-portfolio',
  templateUrl: './portfolio.component.html',
  styleUrls: ['./portfolio.component.css']
})
export class PortfolioComponent implements OnInit {
  portfolios: Portfolio[];
  spinner = false;
  paginator = {
    length: 0,
    pageSize: 3,
    pageSizeOptions: [3, 6, 10],
    pageIndex: 0
  };
  constructor(private adminService: AdminService, private dialog: MatDialog) {
    document.title = 'Manage portfolios';
  }

  ngOnInit() {
    this.spinner = true;
    this.adminService
      .getPortfolios(this.paginator.pageSize, this.paginator.pageIndex)
      .subscribe(
        (data: { portfolios: Portfolio[]; total: number }) => {
          this.portfolios = data.portfolios;
          this.spinner = false;
        },
        (error) => {
          this.spinner = false;
          console.log(error);
        }
      );
  }

  onPaginate(event: PageEvent) {
    this.spinner = true;
    this.paginator.pageSize = event.pageSize;
    this.paginator.pageIndex = event.pageIndex;
    this.adminService
      .getPortfolios(this.paginator.pageSize, this.paginator.pageIndex)
      .subscribe(
        (data: { portfolios: Portfolio[]; total: number }) => {
          this.portfolios = data.portfolios;
          this.spinner = false;
        },
        (error) => {
          this.spinner = false;
          console.log(error);
        }
      );
  }

  onNewPortfolio() {
    const dialogRef = this.dialog.open(NewPortfolioComponent);
    dialogRef.updateSize('100vw');
  }
}
