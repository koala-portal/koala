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
    this.faqSelected.emit();
  }

  // TO DO: allow for modal dialog or drawer (slide on on right) to show the form
}
