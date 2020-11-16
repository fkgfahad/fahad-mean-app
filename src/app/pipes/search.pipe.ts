import { Pipe, PipeTransform } from '@angular/core';

import { User } from '../models/user.model';

@Pipe({
  name: 'search'
})
export class SearchPipe implements PipeTransform {
  transform(users: User[], searchStr: string): any {
    if (!users) {
      return [];
    }
    if (!searchStr || searchStr === '') {
      return users;
    }
    const filteredUsers: User[] = [];
    for (const user of users) {
      if (
        user.name.toLowerCase().includes(searchStr.toLowerCase()) ||
        user.email.toLowerCase().includes(searchStr.toLowerCase())
      ) {
        filteredUsers.push(user);
      }
    }
    return filteredUsers;
  }
}
