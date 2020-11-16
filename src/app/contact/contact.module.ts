import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';

import { MaterialModule } from '../modules/material.module';
import { DirectivesModule } from '../modules/directives.module';
import { ContactService } from './contact.service';

import { ContactComponent } from './contact/contact.component';
import { NewProjectComponent } from './new-project/new-project.component';

const routes: Routes = [{ path: '', component: ContactComponent }];

@NgModule({
  declarations: [ContactComponent, NewProjectComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    ReactiveFormsModule,
    MaterialModule,
    DirectivesModule
  ],
  providers: [ContactService],
  entryComponents: [NewProjectComponent]
})
export class ContactModule {}
