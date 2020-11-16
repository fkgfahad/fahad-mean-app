import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { Routes, RouterModule } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';

import { MaterialModule } from '../modules/material.module';
import { DirectivesModule } from '../modules/directives.module';
import { AuthService } from './auth.service';

import { RegisterComponent } from './register/register.component';
import { LoginComponent } from './login/login.component';
import { VerifyComponent } from './verify/verify.component';

const authRoutes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: '/user/dashboard' },
  { path: 'dashboard', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'login', component: LoginComponent },
  { path: 'forgot', component: VerifyComponent },
  { path: 'reset', component: VerifyComponent }
];

@NgModule({
  declarations: [RegisterComponent, LoginComponent, VerifyComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(authRoutes),
    MaterialModule,
    ReactiveFormsModule,
    HttpClientModule,
    DirectivesModule
  ],
  providers: [AuthService]
})
export class AuthModule {}
