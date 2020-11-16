import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'shortner'
})
export class ShortnerPipe implements PipeTransform {
  transform(value: string, chars: number): any {
    if (value.length <= chars) {
      return value;
    }
    return value.substr(0, chars) + '...';
  }
}
