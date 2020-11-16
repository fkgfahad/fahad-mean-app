import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FilterPipe } from '../pipes/filter.pipe';
import { CapitalizePipe } from '../pipes/capitalize.pipe';
import { SearchPipe } from '../pipes/search.pipe';
import { ShortnerPipe } from '../pipes/shortner.pipe';

@NgModule({
  declarations: [FilterPipe, CapitalizePipe, SearchPipe, ShortnerPipe],
  imports: [CommonModule],
  exports: [FilterPipe, CapitalizePipe, SearchPipe, ShortnerPipe]
})
export class PipeModule {}
