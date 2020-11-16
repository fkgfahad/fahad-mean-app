import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';

import { MaterialModule } from '../modules/material.module';
import { DirectivesModule } from '../modules/directives.module';

import { AboutComponent } from './about/about.component';

const routes: Routes = [{ path: '', component: AboutComponent }];

@NgModule({
  declarations: [AboutComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    MaterialModule,
    DirectivesModule
  ]
})
export class AboutModule {}
