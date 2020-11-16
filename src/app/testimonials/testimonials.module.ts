import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';

import { MaterialModule } from '../modules/material.module';
import { TestimonialsComponent } from './testimonials/testimonials.component';
import { DirectivesModule } from '../modules/directives.module';

const routes: Routes = [{ path: '', component: TestimonialsComponent }];

@NgModule({
  declarations: [TestimonialsComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    MaterialModule,
    DirectivesModule
  ]
})
export class TestimonialsModule {}
