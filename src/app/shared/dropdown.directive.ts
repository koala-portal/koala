import { Directive, HostListener, HostBinding } from '@angular/core';

@Directive({
  selector: '[appDropdown]'
})

export class DropdownDirective {
  @HostBinding('class.open' ) isOpen = false;

  @HostListener('click') toggleOpen(){
    console.log(this.isOpen)
    this.isOpen = !this.isOpen;
    console.log(this.isOpen)
  }
}
