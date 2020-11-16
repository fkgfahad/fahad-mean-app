import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';

import { MaterialModule } from '../modules/material.module';
import { DirectivesModule } from '../modules/directives.module';
import { UserService } from './user.service';

import { UserProfileComponent } from './user/user-profile/user-profile.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ProjectsComponent } from './dashboard/projects/projects.component';
import { ProjectComponent } from './dashboard/projects/project/project.component';
import { UserComponent } from './user/user.component';
import { DeleteDialogComponent } from './user/user-profile/user-delete.component';
import { MessagesComponent } from './dashboard/messages/messages.component';
import { MessageComponent } from './dashboard/messages/message/message.component';
import { OverviewComponent } from './dashboard/overview/overview.component';
import { PasswordChangeComponent } from './user/user-profile/password.component';

const userRoutes: Routes = [
  {
    path: '',
    component: UserComponent
  },
  {
    path: 'dashboard',
    component: DashboardComponent,
    children: [
      {
        path: 'overview',
        component: OverviewComponent
      },
      {
        path: 'projects',
        component: ProjectsComponent,
        children: [{ path: ':projectId', component: ProjectComponent }]
      },
      {
        path: 'messages',
        component: MessagesComponent,
        children: [{ path: ':messageId', component: MessageComponent }]
      }
    ]
  },
  { path: 'profile', component: UserProfileComponent }
];

@NgModule({
  declarations: [
    DashboardComponent,
    UserProfileComponent,
    ProjectsComponent,
    ProjectComponent,
    UserComponent,
    DeleteDialogComponent,
    MessagesComponent,
    MessageComponent,
    OverviewComponent,
    PasswordChangeComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(userRoutes),
    ReactiveFormsModule,
    MaterialModule,
    DirectivesModule
  ],
  providers: [UserService],
  entryComponents: [DeleteDialogComponent, PasswordChangeComponent]
})
export class UserModule {}
