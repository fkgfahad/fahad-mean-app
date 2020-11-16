import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

import { AdminService } from '../admin.service';
import { Message } from '../../models/message.model';

@Component({
  selector: 'app-message',
  templateUrl: './message.component.html',
  styleUrls: ['./message.component.css']
})
export class MessageComponent implements OnInit {
  spinner = false;
  messages: Message[];
  constructor(
    private adminService: AdminService,
    private router: Router,
    private route: ActivatedRoute
  ) {
    document.title = 'Message | Admin Dashboard';
  }

  ngOnInit() {
    this.spinner = true;
    this.adminService.getMessages().subscribe(
      (messages: Message[]) => {
        this.messages = messages;
        this.spinner = false;
        if (this.messages[0]) {
          this.router.navigate([this.messages[0]._id], {
            relativeTo: this.route
          });
        }
      },
      (error) => console.log(error)
    );
  }
}
