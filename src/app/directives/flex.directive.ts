import { Directive, ElementRef, Renderer2, Input, OnInit } from '@angular/core';

@Directive({
  selector: '[appFlex]'
})
export class FlexDirective implements OnInit {
  @Input('appFlex') boxSize: string;
  constructor(private elRef: ElementRef, private renderer: Renderer2) {}

  ngOnInit() {
    const element = this.elRef.nativeElement;
    this.renderer.setStyle(element, 'display', 'flex');
    this.renderer.setStyle(element, 'flex-wrap', 'wrap');
    this.renderer.setStyle(element, 'justify-content', 'center');
    for (const child of element.childNodes) {
      this.renderer.setStyle(child, 'width', '100%');
      this.renderer.setStyle(child, 'max-width', this.boxSize);
      this.renderer.setStyle(child, 'margin', '10px 5px 0');
      this.renderer.setStyle(child, 'padding', '10px');
    }
  }
}
