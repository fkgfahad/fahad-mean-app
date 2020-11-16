import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap } from '@angular/router';

import { Message } from '../../../models/message.model';
import { HelperService } from '../../../services/helper.service';
import { AdminService } from '../../admin.service';

@Component({
  selector: 'app-inbox',
  templateUrl: './inbox.component.html',
  styleUrls: ['./inbox.component.css']
})
export class InboxComponent implements OnInit {
  message: Message;
  spinner = false;

  constructor(
    private route: ActivatedRoute,
    private adminService: AdminService,
    public helper: HelperService
  ) {}

  ngOnInit() {
    this.spinner = true;
    this.route.paramMap.subscribe((paramMap: ParamMap) => {
      this.spinner = true;
      if (paramMap.has('messageId')) {
        this.adminService
          .getMessage(paramMap.get('messageId'))
          .subscribe((message: Message) => {
            this.message = message;
            this.spinner = false;
          });
      }
    });
  }

  onReplay(messageId: string) {}

  onDelete(messageId: string) {}

  onTrash(messageId: string) {}

  onOther(messageId: string) {}
}
