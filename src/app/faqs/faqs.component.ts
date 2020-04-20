import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { Faq } from './faq.model';
import { FaqCategory } from './faq-category.model';
import { FaqsService } from './faqs.service';

@Component({
  selector: 'app-faqs',
  templateUrl: './faqs.component.html',
  styleUrls: ['./faqs.component.scss'],
})
export class FaqsComponent implements OnInit {
  selectedFaqCategory: FaqCategory;

  faqCategories: FaqCategory[];

  userIsAdmin = true; // TODO: Placeholder

  constructor(private faqsService: FaqsService) {}

  ngOnInit(): void {
    this.faqCategories = this.faqsService.getFaqCategories();
  }

  getFilteredCategories(): FaqCategory[] {
    return this.selectedFaqCategory
      ? [this.selectedFaqCategory]
      : this.faqCategories;
  }

  onClickCategory(category: FaqCategory): void {
    if (this.selectedFaqCategory === category) {
      this.selectedFaqCategory = null;
    } else {
      this.selectedFaqCategory = category;
    }
  }

  onClickStarFaq(faq: Faq): void {
    this.faqsService.starFaq(faq);
  }

  onClickDeleteFaq(faq: Faq): void {
    alert('TODO: onClickDeleteFaq');
  }

  onClickEditFaq(faq: Faq): void {
    alert('TODO: onClickEditFaq');
  }

  onClickAddFaq(category: FaqCategory): void {
    alert('TODO: onClickAddFaq');
  }

  onClickAddCategory(): void {
    alert('TODO: onClickAddCategory');
  }
}
