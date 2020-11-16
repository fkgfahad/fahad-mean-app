import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { CarouselModule } from 'ngx-owl-carousel-o';

import { MaterialModule } from '../modules/material.module';
import { DirectivesModule } from '../modules/directives.module';

import { ProjectsComponent } from './projects/projects.component';
import { ProjectDetailComponent } from './project-detail/project-detail.component';
import { PipeModule } from '../modules/pipe.module';

const routes: Routes = [
  {
    path: '',
    component: ProjectsComponent,
    children: [{ path: ':porjectId', component: ProjectDetailComponent }]
  }
];

@NgModule({
  declarations: [ProjectsComponent, ProjectDetailComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    MaterialModule,
    DirectivesModule,
    PipeModule,
    CarouselModule
  ]
})
export class ProjectsModule {}
