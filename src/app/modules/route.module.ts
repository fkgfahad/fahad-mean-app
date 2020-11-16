import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AuthGuard } from '../guards/auth.guard';
import { AdminGuard } from '../guards/admin.guard';

import { PageNotFoundComponent } from '../components/page-not-found/page-not-found.component';

const appRoutes: Routes = [
  { path: '', loadChildren: '../home/home.module#HomeModule' },
  {
    path: 'auth',
    loadChildren: '../auth/auth.module#AuthModule'
  },
  {
    path: 'user',
    loadChildren: '../user/user.module#UserModule',
    canActivate: [AuthGuard]
  },
  {
    path: 'admin',
    loadChildren: '../admin/admin.module#AdminModule',
    canActivate: [AdminGuard]
  },
  { path: 'about', loadChildren: '../about/about.module#AboutModule' },
  {
    path: 'projects',
    loadChildren: '../projects/projects.module#ProjectsModule'
  },
  { path: 'contact', loadChildren: '../contact/contact.module#ContactModule' },
  {
    path: 'testimonials',
    loadChildren: '../testimonials/testimonials.module#TestimonialsModule'
  },
  {
    path: 'skills',
    loadChildren: '../skills/skills.module#SkillsModule'
  },
  { path: '**', component: PageNotFoundComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(appRoutes)],
  exports: [RouterModule]
})
export class RouteModule {}
