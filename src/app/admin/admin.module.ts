import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { MaterialModule } from '../modules/material.module';
import { DirectivesModule } from '../modules/directives.module';
import { PipeModule } from '../modules/pipe.module';

import { AdminService } from './admin.service';

import { DashboardComponent } from './dashboard/dashboard.component';
import { UsersComponent } from './users/users.component';
import { ProjectsComponent } from './projects/projects.component';
import { PortfolioComponent } from './portfolio/portfolio.component';
import { TestimonialComponent } from './testimonial/testimonial.component';
import { NewsletterComponent } from './newsletter/newsletter.component';
import { MessageComponent } from './message/message.component';
import { InboxComponent } from './message/inbox/inbox.component';
import { NewPortfolioComponent } from './portfolio/new-portfolio/new-portfolio.component';

const adminRoutes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: 'dashboard/messages' },
  {
    path: 'dashboard',
    component: DashboardComponent,
    children: [
      {
        path: 'messages',
        component: MessageComponent,
        children: [{ path: ':messageId', component: InboxComponent }]
      },
      { path: 'users', component: UsersComponent },
      { path: 'portfolio', component: PortfolioComponent },
      { path: 'newsletter', component: NewsletterComponent },
      { path: 'projects', component: ProjectsComponent },
      { path: 'testimonial', component: TestimonialComponent }
    ]
  }
];

@NgModule({
  declarations: [
    DashboardComponent,
    UsersComponent,
    ProjectsComponent,
    PortfolioComponent,
    TestimonialComponent,
    NewsletterComponent,
    MessageComponent,
    InboxComponent,
    NewPortfolioComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(adminRoutes),
    MaterialModule,
    DirectivesModule,
    FormsModule,
    ReactiveFormsModule,
    PipeModule
  ],
  providers: [AdminService],
  entryComponents: [NewPortfolioComponent]
})
export class AdminModule {}
