import { Directive, ElementRef, Renderer2, OnInit } from '@angular/core';

@Directive({
  selector: '[appFadeIn]'
})
export class AnimationDirective implements OnInit {
  constructor(private elRef: ElementRef, private renderer: Renderer2) {}
  ngOnInit() {
    this.renderer.addClass(this.elRef.nativeElement, 'fadein');
  }
}
