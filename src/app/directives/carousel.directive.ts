import {
  Directive,
  OnInit,
  Input,
  ViewContainerRef,
  TemplateRef
} from '@angular/core';

@Directive({
  selector: '[carousel]'
})
export class CarouselDirective implements OnInit {
  @Input('carouselOf') images: string[];

  private carouselIndex = 0;

  constructor(private vcr: ViewContainerRef, private tmpl: TemplateRef<any>) {}

  ngOnInit() {
    this.vcr.createEmbeddedView(this.tmpl, {
      $implicit: this.images[this.carouselIndex],
      controller: {
        previous: () => {},
        next: () => {}
      }
    });
  }
}
