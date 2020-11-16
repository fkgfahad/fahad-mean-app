import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HoverDirective } from '../directives/hover.directive';
import { AnimationDirective } from '../directives/animation.directive';
import { FlexDirective } from '../directives/flex.directive';
import { CarouselDirective } from '../directives/carousel.directive';
import { SpinnerComponent } from '../directives/spinner.directive';
import { MaterialModule } from './material.module';

@NgModule({
  declarations: [
    HoverDirective,
    AnimationDirective,
    FlexDirective,
    CarouselDirective,
    SpinnerComponent
  ],
  imports: [CommonModule, MaterialModule],
  exports: [
    HoverDirective,
    AnimationDirective,
    FlexDirective,
    CarouselDirective,
    SpinnerComponent
  ]
})
export class DirectivesModule {}
