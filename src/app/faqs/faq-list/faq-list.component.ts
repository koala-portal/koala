import { Component, OnInit, OnDestroy } from '@angular/core';
import { Faq } from '../faq.model';
import { FaqCategory } from '../faq-category.model';
import { FaqsService } from '../faqs.service';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { MessageService } from 'src/app/shared/message.service';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { FaqFormDialogComponent } from '../faq-form-dialog/faq-form-dialog.component';
import { FaqCategoryFormDialogComponent } from '../faq-category-form-dialog/faq-category-form-dialog.component';

@Component({
  selector: 'app-faqs-list',
  templateUrl: './faq-list.component.html',
  styleUrls: ['./faq-list.component.scss'],
})
export class FaqListComponent implements OnInit, OnDestroy {
  filterFaqCategory: FaqCategory;
  selectedFaq: Faq;

  faqCategories: FaqCategory[];

  private paramsSub: Subscription;
  private faqCategoriesSub: Subscription;

  userIsAdmin = true; // TODO: Placeholder
  topOnly = true;

  constructor(
    private faqsService: FaqsService,
    private messageService: MessageService,
    private route: ActivatedRoute,
    private dialog: MatDialog
  ) {}

  ngOnInit(): void {
    this.faqCategories = this.faqsService.getFaqCategories();
    // this.filterFaqCategory = this.faqCategories[0];
    this.paramsSub = this.route.params.subscribe((params) => {
      if (params.id) {
        this.topOnly = false;
        this.selectedFaq = this.faqsService.findFaqById(params.id);
        this.filterFaqCategory = this.selectedFaq.category;
      }
    });
    this.faqCategoriesSub = this.faqsService.faqCategorie$.subscribe(
      (faqCategories) => {
        this.faqCategories = faqCategories;
        if (this.filterFaqCategory) {
          this.filterFaqCategory = this.faqCategories.find(
            (cat) => cat.id === this.filterFaqCategory.id
          );
        }
      }
    );
  }

  ngOnDestroy(): void {
    this.paramsSub.unsubscribe();
    this.faqCategoriesSub.unsubscribe();
  }

  getFilteredCategories(): FaqCategory[] {
    if (!this.topOnly) {
      return this.filterFaqCategory
        ? [this.filterFaqCategory]
        : this.faqCategories;
    } else {
      return [];
    }
  }

  findAllFaqsByFaqCategory(faqCategory: FaqCategory): Faq[] {
    return this.faqsService.findAllByFaqCategory(faqCategory);
  }

  onClickCategory(category: FaqCategory): void {
    if (!category || this.filterFaqCategory?.id === category.id) {
      this.filterFaqCategory = null;
    } else {
      this.topOnly = false;
      this.filterFaqCategory = category;
    }
  }

  onClickTopCategory(): void {
    if (this.topOnly) {
      this.topOnly = false;
    } else {
      this.topOnly = true;
      this.filterFaqCategory = null;
    }
  }

  onClickAddFaq(category: FaqCategory): void {
    this.openFaqFormDialog(null, category);
  }

  openFaqFormDialog(
    faq?: Faq,
    faqCategory?: FaqCategory
  ): MatDialogRef<FaqFormDialogComponent, Faq> {
    return this.dialog.open(FaqFormDialogComponent, {
      disableClose: true,
      width: '500px',
      data: {
        faq,
        category: faqCategory,
      },
    });
  }

  onClickAddCategory(): void {
    this.openFaqCategoryFormDialog();
  }

  onClickEditCategory(category: FaqCategory): void {
    this.openFaqCategoryFormDialog(category);
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

  openFaqCategoryFormDialog(
    faqCategory?: FaqCategory
  ): MatDialogRef<FaqCategoryFormDialogComponent, FaqCategory> {
    return this.dialog.open(FaqCategoryFormDialogComponent, {
      disableClose: true,
      width: '500px',
      data: faqCategory,
    });
  }

  getTopFaqs(): Faq[] {
    return this.faqsService.findAllByStarred(true);
  }
}
