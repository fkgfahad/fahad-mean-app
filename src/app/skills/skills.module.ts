import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';

import { MaterialModule } from '../modules/material.module';
import { SkillsComponent } from './skills/skills.component';
import { DirectivesModule } from '../modules/directives.module';
import { SkillService } from './skill.service';

const routes: Routes = [{ path: '', component: SkillsComponent }];

@NgModule({
  declarations: [SkillsComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    MaterialModule,
    DirectivesModule
  ],
  providers: [SkillService]
})
export class SkillsModule {}
