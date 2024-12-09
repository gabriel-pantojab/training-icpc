import {
  Directive,
  ElementRef,
  HostListener,
  inject,
  output,
  OutputEmitterRef,
} from '@angular/core';

@Directive({
  selector: '[appClickOutSide]',
  standalone: true,
})
export class ClickOutSideDirective {
  public clickOutSideAction: OutputEmitterRef<void> = output<void>();

  private _elementRef: ElementRef;

  constructor() {
    this._elementRef = inject(ElementRef);
  }

  @HostListener('document:click', ['$event'])
  public onClick(event: MouseEvent): void {
    if (!this._elementRef.nativeElement.contains(event.target)) {
      this.clickOutSideAction.emit();
    }
  }
}
