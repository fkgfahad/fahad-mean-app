import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material';

import { NewProjectComponent } from '../new-project/new-project.component';
import { HelperService } from '../../services/helper.service';
import { ContactService } from '../contact.service';
import { Contact } from '../../models/contact.model';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.css']
})
export class ContactComponent implements OnInit {
  contactInfo: Contact[] = [];
  ctForm: FormGroup;
  infoSpinner = false;
  msSpinner = false;
  ctMessage: { message: string; color: string };
  ctThanks = false;

  displayedColumns: string[] = ['name', 'value'];

  constructor(
    private dialog: MatDialog,
    public helper: HelperService,
    private contactService: ContactService
  ) {
    document.title = 'Contact | Fahad Hossain';
  }

  ngOnInit() {
    scrollTo({
      top: 0,
      behavior: 'smooth'
    });

    this.infoSpinner = true;
    this.contactService.getContacts().subscribe((contacts: Contact[]) => {
      this.contactInfo = contacts;
      this.infoSpinner = false;
    });
    this.ctForm = new FormGroup({
      name: new FormControl(null, { validators: Validators.required }),
      email: new FormControl(null, {
        validators: [Validators.required, Validators.email]
      }),
      message: new FormControl(null, { validators: Validators.required }),
      letter: new FormControl(true)
    });
  }

  onContact() {
    if (this.ctForm.invalid) {
      return;
    }
    this.msSpinner = true;
    this.contactService
      .sendMessage(
        this.ctForm.value.name,
        this.ctForm.value.email,
        this.ctForm.value.message,
        this.ctForm.value.letter
      )
      .subscribe(
        (data: { message: string; color: string }) => {
          this.ctMessage = data;
          this.msSpinner = false;
          this.ctThanks = true;
        },
        (error) => console.log(error)
      );
  }

  onNewProject() {
    const dialogRef = this.dialog.open(NewProjectComponent);
    dialogRef.afterClosed().subscribe((res) => {});
    dialogRef.updateSize('100vw', '90vh');
  }
}
