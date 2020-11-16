import { Component, OnInit } from '@angular/core';

import { User } from '../../models/user.model';
import { AdminService } from '../admin.service';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent implements OnInit {
  search = '';
  unverified = false;
  disabled = false;
  admin = false;
  users: User[];
  spinner = false;
  constructor(private adminService: AdminService) {
    document.title = 'Manage Users| Admin Dashboard';
  }

  ngOnInit() {
    this.spinner = true;
    this.adminService.getUsers().subscribe(
      (users: User[]) => {
        this.users = users;
        this.spinner = false;
      },
      (err) => {
        console.log(err);
        this.spinner = false;
      }
    );
  }

  onUnsort() {
    this.unverified = false;
    this.disabled = false;
    this.admin = false;
    this.search = '';
  }

  onDisable(id: string) {}
  onDelete(id: string) {}
  onMakeAdmin(id: string) {}
  onMessage(id: string) {}
  onWarning(id: string) {}
  onCancelAdmin(id: string) {
    if (confirm('Are you sure to cancel his/her adminship?')) {
      console.log('Adminship removed for id ' + id);
    }
  }
}
