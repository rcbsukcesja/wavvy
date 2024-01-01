import { Directive, ElementRef, Renderer2 } from '@angular/core';

@Directive({
  standalone: true,
  selector: '[appCenterDirective]',
})
export class CenterDirective {
  constructor(private element: ElementRef, private renderer: Renderer2) {
    this.renderer.addClass(this.element.nativeElement, 'flex');
    this.renderer.addClass(this.element.nativeElement, 'flex-col');
    this.renderer.addClass(this.element.nativeElement, 'min-h-[calc(100vh-152px)]');
  }
}