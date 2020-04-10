import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';
import { Faq } from '../faq.model';

@Component({
  selector: 'app-faq-top-ten',
  templateUrl: './faq-top-ten.component.html',
  styleUrls: ['./faq-top-ten.component.scss'],
})
export class FaqTopTenComponent implements OnInit {
  @Input() faq: Faq;
  @Output() faqSelected = new EventEmitter<void>();

  constructor() {}

  ngOnInit(): void {}

  onSelected() {
    console.log('adesfas');
    this.faqSelected.emit();
  }
}
