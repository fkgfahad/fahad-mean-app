import {
  Directive,
  OnInit,
  ElementRef,
  Renderer2,
  HostListener
} from '@angular/core';

@Directive({
  selector: '[appHover]'
})
export class HoverDirective implements OnInit {
  constructor(private elRef: ElementRef, private renderer: Renderer2) {}

  ngOnInit() {
    this.renderer.setStyle(
      this.elRef.nativeElement.lastElementChild,
      'transition',
      'all .3s'
    );
    this.renderer.setStyle(
      this.elRef.nativeElement.lastElementChild,
      'opacity',
      0
    );
  }

  @HostListener('mouseenter') mouseover(eventData: Event) {
    this.renderer.setStyle(
      this.elRef.nativeElement.lastElementChild,
      'opacity',
      1
    );
  }

  @HostListener('mouseleave') mouseleave(eventData: Event) {
    this.renderer.setStyle(
      this.elRef.nativeElement.lastElementChild,
      'opacity',
      0
    );
  }
}
