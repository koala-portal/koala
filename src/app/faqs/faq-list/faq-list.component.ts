import { Component, OnInit, OnDestroy } from '@angular/core';
import { Faq } from '../faq.model';
import { FaqCategory } from '../faq-category.model';
import { FaqsService } from '../faqs.service';
import { DialogService } from '../../shared/dialog.service';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-faqs-list',
  templateUrl: './faq-list.component.html',
  styleUrls: ['./faq-list.component.scss'],
})
export class FaqListComponent implements OnInit, OnDestroy {
  selectedFaqCategory: FaqCategory;
  selectedFaq: Faq;

  faqCategories: FaqCategory[];

  private paramsSub: Subscription;

  userIsAdmin = false; // TODO: Placeholder

  constructor(
    private faqsService: FaqsService,
    private dialogService: DialogService,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.faqCategories = this.faqsService.getFaqCategories();
    this.paramsSub = this.route.params.subscribe((params) => {
      if (params.id) {
        this.selectedFaq = this.faqsService.findFaqById(params.id);
        this.selectedFaqCategory = this.faqCategories.find((cat) =>
          cat.faqs.find((faq) => faq.id === this.selectedFaq.id)
        );
      }
    });
  }

  ngOnDestroy(): void {
    this.paramsSub.unsubscribe();
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

  onClickDeleteCategory(category: FaqCategory): void {
    alert('TODO: onClickDeleteCategory');
  }

  onOpenFaq(faq: Faq): void {
    this.selectedFaq = faq;
  }
}
