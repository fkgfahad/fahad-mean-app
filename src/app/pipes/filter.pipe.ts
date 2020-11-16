import { PipeTransform, Pipe } from '@angular/core';

@Pipe({
  name: 'filter',
  pure: false
})
export class FilterPipe implements PipeTransform {
  transform(
    value: any[],
    unverified: boolean,
    disabled: boolean,
    admin: boolean
  ) {
    if (!unverified && !disabled && !admin) {
      return value;
    }
    if (unverified) {
      value = value.filter((user) => user.email.verified !== unverified);
      if (disabled) {
        value = value.filter((user) => user.email.disabled === disabled);
        if (admin) {
          return value.filter((user) => user.type === 'admin');
        } else {
          return value;
        }
      } else {
        if (admin) {
          return value.filter((user) => user.type === 'admin');
        } else {
          return value;
        }
      }
    }

    if (disabled) {
      value = value.filter((user) => user.email.disabled === disabled);
      if (unverified) {
        value = value.filter((user) => user.email.verified !== unverified);
        if (admin) {
          return value.filter((user) => user.type === 'admin');
        } else {
          return value;
        }
      } else {
        if (admin) {
          return value.filter((user) => user.type === 'admin');
        } else {
          return value;
        }
      }
    }

    if (admin) {
      value = value.filter((user) => user.type === 'admin');
      if (unverified) {
        value = value.filter((user) => user.email.verified !== unverified);
        if (disabled) {
          return value.filter((user) => user.email.disabled === disabled);
        } else {
          return value;
        }
      } else {
        if (disabled) {
          return value.filter((user) => user.email.disabled === disabled);
        } else {
          return value;
        }
      }
    }
  }
}
