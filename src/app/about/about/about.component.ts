import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import {
  trigger,
  transition,
  query,
  stagger,
  animate,
  style
} from '@angular/animations';

@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.css'],
  animations: [
    trigger('textAnimation', [
      transition('* => *', [
        query(
          'span',
          style({
            opacity: 0
          })
        ),
        query(
          'span',
          stagger(500, [
            animate(
              500,
              style({
                opacity: 1
              })
            )
          ])
        )
      ])
    ]),
    trigger('imgAnimate', [
      transition('* => *', [
        query(
          'img',
          style({
            transform: 'translateX(-300%)',
            opacity: 0
          })
        ),
        query(
          'img',
          animate(
            800,
            style({
              transform: 'translateY(0)',
              opacity: 1
            })
          )
        )
      ])
    ])
  ]
})
export class AboutComponent implements OnInit {
  @ViewChild('heroText') heroText: ElementRef;
  constructor() {
    document.title = 'About Fahad | Angular & MEAN Stack Developer';
  }

  ngOnInit() {}
}
