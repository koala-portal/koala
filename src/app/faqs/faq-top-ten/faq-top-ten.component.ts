import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';
import { Faq } from '../faq.model';
import { FaqsService } from '../faqs.service';

@Component({
  selector: 'app-faq-top-ten',
  templateUrl: './faq-top-ten.component.html',
  styleUrls: ['./faq-top-ten.component.scss'],
})
export class FaqTopTenComponent implements OnInit {
  faqs: Faq[];

  constructor(private faqsService: FaqsService) {}

  ngOnInit(): void {
    this.faqs = this.faqsService.getFaqs();
  }

  onSelected() {
    alert('open faq page and highlight selected faq');
  }
}
