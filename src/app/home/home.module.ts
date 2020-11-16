import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { MaterialModule } from '../modules/material.module';
import { DirectivesModule } from '../modules/directives.module';

import { HomeComponent } from './home/home.component';
import { HomeService } from './home.service';

const routes: Routes = [{ path: '', component: HomeComponent }];

@NgModule({
  declarations: [HomeComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    MaterialModule,
    ReactiveFormsModule,
    DirectivesModule,
    HttpClientModule
  ],
  providers: [HomeService]
})
export class HomeModule {}
