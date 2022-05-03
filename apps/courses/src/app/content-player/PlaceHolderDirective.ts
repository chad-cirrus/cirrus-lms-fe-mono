import { Directive, ViewContainerRef } from '@angular/core';

@Directive({
  selector: '[cirrusPlaceholder]',
})
export class PlaceholderDirective {
  constructor(public ViewContainerRef: ViewContainerRef) {}
}
