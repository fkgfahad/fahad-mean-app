import { Component, OnInit } from '@angular/core';

import { AdminService } from '../admin.service';
import { Newsletter } from 'src/app/models/newsletter.model';

@Component({
  selector: 'app-newsletter',
  templateUrl: './newsletter.component.html',
  styleUrls: ['./newsletter.component.css']
})
export class NewsletterComponent implements OnInit {
  newsletters: Newsletter[];

  constructor(private adminService: AdminService) {
    document.title = 'Manage Newsletters | Admin';
  }

  ngOnInit() {
    this.adminService
      .getNewsletters()
      .subscribe(
        (newsletters: Newsletter[]) => (this.newsletters = newsletters)
      );
  }
}
