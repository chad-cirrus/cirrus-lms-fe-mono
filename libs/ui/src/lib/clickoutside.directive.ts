import {
  Directive,
  ElementRef,
  HostListener,
  Output,
  EventEmitter,
} from '@angular/core';

@Directive({
  selector: '[cirrusClickOutside]',
})
export class ClickOutsideDirective {
  constructor(private elementRef: ElementRef) {}

  @Output() clickOutside = new EventEmitter<MouseEvent>();

  @HostListener('document:click', ['$event', '$event.target'])
  public onClick(event: MouseEvent, targetElement: HTMLElement): void {
    if (!targetElement) {
      return;
    }
    const clickedInside = this.elementRef.nativeElement.contains(targetElement);
    if (!clickedInside) {
      this.emitClickOutside(event);
    }
  }

  emitClickOutside(event: MouseEvent) {
    this.clickOutside.emit(event);
  }
}
