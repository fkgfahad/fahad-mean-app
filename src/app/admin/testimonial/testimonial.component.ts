import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { PageEvent } from '@angular/material';

import { AdminService } from '../admin.service';
import { Testimonial } from '../../models/testimonial.model';
import { HelperService } from '../../services/helper.service';

@Component({
  selector: 'app-testimonial',
  templateUrl: './testimonial.component.html',
  styleUrls: ['./testimonial.component.css']
})
export class TestimonialComponent implements OnInit {
  @ViewChild('tstForm') tstForm: NgForm;
  testimonials: Testimonial[];
  tstSpinner = false;
  paginator = {
    length: 0,
    pageSize: 3,
    pageSizeOptions: [3, 6, 10],
    pageIndex: 0
  };
  tfSpinner = false;
  constructor(
    private adminService: AdminService,
    public helper: HelperService
  ) {
    document.title = 'Testimonials | Admin Panel';
  }

  ngOnInit() {
    this.tstSpinner = true;
    this.adminService
      .getTestimonials(this.paginator.pageSize, this.paginator.pageIndex)
      .subscribe(
        (data) => {
          this.testimonials = data.testimonials;
          this.paginator.length = data.total;
          this.tstSpinner = false;
        },
        (error) => {
          console.log(error);
          this.tstSpinner = false;
        }
      );
  }

  onPaginate(event: PageEvent) {
    this.tstSpinner = true;
    this.paginator.pageSize = event.pageSize;
    this.paginator.pageIndex = event.pageIndex;
    this.adminService
      .getTestimonials(this.paginator.pageSize, this.paginator.pageIndex)
      .subscribe(
        (data) => {
          this.testimonials = data.testimonials;
          this.paginator.length = data.total;
          this.tstSpinner = false;
        },
        (error) => {
          console.log(error);
          this.tstSpinner = false;
        }
      );
  }

  onSave() {
    if (this.tstForm.invalid) {
      return;
    }
    this.tfSpinner = true;
    this.adminService
      .saveTestimonial(this.tstForm.value.name, this.tstForm.value.speech)
      .subscribe(
        (message: string) => {
          this.helper.openSnackbar(message);
          this.tfSpinner = false;
          this.tstSpinner = true;
          this.tstForm.resetForm();
          this.adminService
            .getTestimonials(this.paginator.pageSize, this.paginator.pageIndex)
            .subscribe(
              (data) => {
                this.testimonials = data.testimonials;
                this.paginator.length = data.total;
                this.tstSpinner = false;
              },
              (error) => {
                console.log(error);
                this.tstSpinner = false;
              }
            );
        },
        (error) => {
          this.tfSpinner = false;
          this.helper.openSnackbar(error.error.message);
        }
      );
  }

  onDelete(tstId: string) {
    if (confirm('Are you sure to delete the testimonial: ' + tstId)) {
      this.adminService.deleteTestimonial(tstId).subscribe(
        (message: string) => {
          this.helper.openSnackbar(message);
          this.tstSpinner = true;
          this.adminService
            .getTestimonials(this.paginator.pageSize, this.paginator.pageIndex)
            .subscribe(
              (data) => {
                this.testimonials = data.testimonials;
                this.paginator.length = data.total;
                this.tstSpinner = false;
              },
              (error) => {
                console.log(error);
                this.tstSpinner = false;
              }
            );
        },
        (error) => {
          this.helper.openSnackbar(error.error);
        }
      );
    } else {
      return false;
    }
  }

  toggleChange(tstId: string, status: boolean) {
    this.adminService.editTestimonialStatus(tstId, status).subscribe(
      (res: { message: string; show: boolean }) => {
        this.testimonials.forEach((tst) => {
          if (tst._id === tstId) {
            tst.show = res.show;
          }
        });
        this.helper.openSnackbar(res.message);
      },
      (error) => {
        console.log(error);
        this.helper.openSnackbar(error.error.message);
      }
    );
  }
}
