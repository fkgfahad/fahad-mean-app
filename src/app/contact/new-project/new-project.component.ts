import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

import { HelperService } from 'src/app/services/helper.service';
import { MatDialogRef } from '@angular/material';

@Component({
  selector: 'app-new-project',
  templateUrl: './new-project.component.html',
  styleUrls: ['./new-project.component.css']
})
export class NewProjectComponent implements OnInit, OnDestroy {
  pdForm: FormGroup;

  constructor(
    private dialogRef: MatDialogRef<NewProjectComponent>,
    public helper: HelperService
  ) {
    document.title = 'Create a new project | Fahad Hossain';
  }

  ngOnInit() {
    this.pdForm = new FormGroup({
      type: new FormControl(null, { validators: Validators.required }),
      budget: new FormControl(null),
      detail: new FormControl(null, {
        validators: [Validators.required, Validators.minLength(200)]
      }),
      duration: new FormControl(null),
      email: new FormControl(null, {
        validators: [Validators.required, Validators.email]
      }),
      name: new FormControl(null, { validators: Validators.required }),
      skype: new FormControl(null)
    });
  }

  onProjectDiss() {
    if (this.pdForm.invalid) {
      return;
    }
    this.helper.openSnackbar('You must login to propose a project');
  }

  onCloseDialog() {
    this.dialogRef.close();
  }

  ngOnDestroy() {
    document.title = 'Contact | Fahad Hossain';
  }
}
