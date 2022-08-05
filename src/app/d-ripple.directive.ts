import { Directive, ElementRef, HostListener, Renderer2 } from '@angular/core';

@Directive({
  selector: '[d-ripple]'
})
export class DRippleDirective {

  constructor(
    private readonly rd2: Renderer2,
    private readonly elr: ElementRef<HTMLElement>,
  ) {
    rd2.setStyle(elr.nativeElement, 'position', 'relative')
  }

  addNode() {
    const rNode = document.createElement('span');
          rNode.className = 'd-ripple-effect'
  }

}
