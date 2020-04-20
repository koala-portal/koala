import { Component, OnInit } from '@angular/core';
import { Faq } from '../faq.model';
import { FaqCategory } from '../faq-category.model';
import { FaqsService } from '../faqs.service';
import { DialogService } from '../../shared/dialog.service';

@Component({
  selector: 'app-faqs-list',
  templateUrl: './faq-list.component.html',
  styleUrls: ['./faq-list.component.scss'],
})
export class FaqListComponent implements OnInit {
  selectedFaqCategory: FaqCategory;

  faqCategories: FaqCategory[];

  userIsAdmin = true; // TODO: Placeholder

  constructor(
    private faqsService: FaqsService,
    private dialogService: DialogService
  ) {}

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
    this.dialogService
      .openConfirmDialog(
        'Delete FAQ',
        'Are you sure you want to delete this FAQ?'
      )
      .afterClosed()
      .subscribe((confirm) => {
        if (confirm) {
          this.faqsService.deleteFaq(faq);
        }
      });
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

  onClickEditCategory(): void {
    alert('TODO: onClickEditCategory');
  }

  onClickDeleteCategory(): void {
    alert('TODO: onClickDeleteCategory');
  }
}
