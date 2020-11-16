import { PipeTransform, Pipe } from '@angular/core';

@Pipe({
  name: 'capitalize'
})
export class CapitalizePipe implements PipeTransform {
  transform(value: string) {
    const strArr = value.split(' ');
    const newArr = [];
    strArr.forEach((str) => {
      const start = str.substr(0, 1).toUpperCase();
      const end = str.substr(1);
      newArr.push(start + end);
    });
    return newArr.join(' ');
  }
}
