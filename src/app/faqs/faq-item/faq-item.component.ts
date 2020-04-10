import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';
import { Faq } from '../faq.model';

@Component({
  selector: 'app-faq-item',
  templateUrl: './faq-item.component.html',
  styleUrls: ['./faq-item.component.scss'],
})
export class FaqItemComponent implements OnInit {
  @Input() faq: Faq;
  @Output() faqSelected = new EventEmitter<void>();

  constructor() {}

  ngOnInit(): void {}

  onSelected() {
    console.log('asdf as');
    this.faqSelected.emit();
  }
}
