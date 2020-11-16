import { Component, OnInit } from '@angular/core';

import { HelperService } from '../../services/helper.service';
import {
  trigger,
  state,
  style,
  transition,
  animate
} from '@angular/animations';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css'],
  animations: [
    trigger('scrollTop', [
      state(
        'show',
        style({
          transform: 'skew(0deg) rotate(0deg) translate(0, 0)',
          opacity: '1'
        })
      ),
      state(
        'hide',
        style({
          transform: 'skew(45deg) rotate(-45deg) translate(-100%, 150%)',
          opacity: '0'
        })
      ),
      transition('show <=> hide', animate(500))
    ])
  ]
})
export class FooterComponent implements OnInit {
  thisYear = new Date().getFullYear();
  state: 'show' | 'hide' = 'show';
  constructor(public helper: HelperService) {}

  ngOnInit() {
    document.addEventListener('wheel', (event: any) => {
      if (event.pageY > 1200) {
        this.state = 'show';
      } else {
        this.state = 'hide';
      }
    });
  }

  onContact() {
    setTimeout(() => {
      this.helper.scrollTo(1300);
    }, 600);
  }
}
