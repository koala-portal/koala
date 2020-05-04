import { Component, OnInit } from '@angular/core';
import { Faq } from '../faq.model';
import { FaqsService } from '../faqs.service';

@Component({
  selector: 'app-faq-starred',
  templateUrl: './faq-starred.component.html',
  styleUrls: ['./faq-starred.component.scss'],
})
export class FaqStarredComponent implements OnInit {
  faqs: Faq[];

  constructor(private faqsService: FaqsService) {}

  ngOnInit(): void {
    this.faqs = this.faqsService.getFaqs().filter((faq) => faq.starred);
  }
}
