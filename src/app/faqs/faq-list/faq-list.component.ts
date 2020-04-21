import { Component, OnInit, OnDestroy } from '@angular/core';
import { Faq } from '../faq.model';
import { FaqCategory } from '../faq-category.model';
import { FaqsService } from '../faqs.service';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { MessageService } from 'src/app/shared/message.service';

@Component({
  selector: 'app-faqs-list',
  templateUrl: './faq-list.component.html',
  styleUrls: ['./faq-list.component.scss'],
})
export class FaqListComponent implements OnInit, OnDestroy {
  filterFaqCategory: FaqCategory;
  selectedFaqCategory: FaqCategory;
  selectedFaq: Faq;

  faqCategories: FaqCategory[];

  private paramsSub: Subscription;
  private faqCategoriesSub: Subscription;

  userIsAdmin = true; // TODO: Placeholder

  constructor(
    private faqsService: FaqsService,
    private messageService: MessageService,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.faqCategories = this.faqsService.getFaqCategories();
    this.paramsSub = this.route.params.subscribe((params) => {
      if (params.id) {
        this.selectedFaq = this.faqsService.findFaqById(params.id);
        this.filterFaqCategory = this.selectedFaq.category;
        this.selectedFaqCategory = this.filterFaqCategory;
      }
    });
    this.faqCategoriesSub = this.faqsService.faqCategorie$.subscribe(
      (faqCategories) => {
        this.faqCategories = faqCategories;
      }
    );
  }

  ngOnDestroy(): void {
    this.paramsSub.unsubscribe();
    this.faqCategoriesSub.unsubscribe();
  }

  getFilteredCategories(): FaqCategory[] {
    return this.filterFaqCategory
      ? [this.filterFaqCategory]
      : this.faqCategories;
  }

  findAllFaqsByFaqCategory(faqCategory: FaqCategory): Faq[] {
    return this.faqsService.findAllFaqsByFaqCategory(faqCategory);
  }

  onClickCategory(category: FaqCategory): void {
    if (!category || this.filterFaqCategory?.id === category.id) {
      this.filterFaqCategory = null;
    } else {
      this.filterFaqCategory = category;
    }
  }

  onClickStarFaq(faq: Faq): void {
    this.faqsService.starFaq(faq);
  }

  onClickDeleteFaq(faq: Faq): void {
    this.messageService
      .openConfirmDialog(
        'Delete FAQ',
        'Are you sure you want to delete this FAQ?'
      )
      .afterClosed()
      .subscribe((confirm) => {
        if (confirm) {
          this.faqsService.delete(faq);
        }
      });
  }

  onClickEditFaq(faq: Faq): void {
    this.faqsService.openFaqFormDialog(faq);
  }

  onClickAddFaq(category: FaqCategory): void {
    this.faqsService.openFaqFormDialog(null, category);
  }

  onClickAddCategory(): void {
    this.faqsService.openFaqCategoryFormDialog();
  }

  onClickEditCategory(category: FaqCategory): void {
    this.faqsService.openFaqCategoryFormDialog(category);
  }

  onClickDeleteCategory(category: FaqCategory): void {
    this.messageService
      .openConfirmDialog(
        'Delete Category',
        'Are you sure you want to delete this Category?'
      )
      .afterClosed()
      .subscribe((confirm) => {
        if (confirm) {
          this.faqsService.deleteFaqCategory(category);
        }
      });
  }

  onOpenFaq(faq: Faq): void {
    this.selectedFaq = faq;
  }

  onOpenFaqCategory(faqCategory: FaqCategory): void {
    this.selectedFaqCategory = faqCategory;
  }
}
