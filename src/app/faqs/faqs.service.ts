import { Injectable } from '@angular/core';
import { FaqCategory } from './faq-category.model';
import { Faq } from './faq.model';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { FaqCategoryFormDialogComponent } from './faq-category-form-dialog/faq-category-form-dialog.component';
import { Observable, of, Subject } from 'rxjs';
import { FaqFormDialogComponent } from './faq-form-dialog/faq-form-dialog.component';

@Injectable({ providedIn: 'root' })
export class FaqsService {
  private faqCategories: FaqCategory[] = [
    {
      id: 'a',
      title: 'General',
      description: 'General Questions',
      icon: 'fa-life-saver',
      faqs: [
        {
          id: 'a',
          title: 'How do I do the thing?',
          description: 'You can do the thing in a number of ways.',
          starred: false,
          created: new Date(),
          createdBy: 'user1',
          updated: null,
          updatedBy: null,
        },
        {
          id: 'b',
          title: 'If I do it this way, how can it be done?',
          description: 'You should do the thing the way we told you.',
          starred: false,
          created: new Date(),
          createdBy: 'user2',
          updated: null,
          updatedBy: null,
        },
      ],
    },
    {
      id: 'b',
      title: 'One',
      description:
        'One Questions and other things related to the One. This is just going to be a very long description and you are going to have to deal with that.',
      icon: 'fa-times',
      faqs: [
        {
          id: 'c',
          title: 'I think I am doing this wrong. Am I doing this wrong?',
          description: 'Yes you should consider doing it the other way.',
          starred: false,
          created: new Date(),
          createdBy: 'user1',
          updated: new Date(),
          updatedBy: 'user1',
        },
      ],
    },
  ];

  faqCategorie$ = new Subject<FaqCategory[]>();

  constructor(private dialog: MatDialog) {}

  getFaqCategories(): FaqCategory[] {
    return this.faqCategories.slice();
  }

  getFaqs(): Faq[] {
    return this.faqCategories.flatMap((category) => category.faqs);
  }

  findFaqById(id: string): Faq {
    return this.getFaqs().find((faq) => faq.id === id);
  }

  findFaqCategoryById(id: string): FaqCategory {
    return this.faqCategories.find((cat) => cat.id === id);
  }

  starFaq(faq: Faq): void {
    faq.starred = !faq.starred;
  }

  deleteFaq(faqToDelete: Faq): void {
    this.faqCategories.forEach((category) => {
      category.faqs = category.faqs.filter((faq) => faqToDelete.id !== faq.id);
    });
  }

  openFaqCategoryFormDialog(
    faqCategory: FaqCategory
  ): MatDialogRef<FaqCategoryFormDialogComponent, FaqCategory> {
    return this.dialog.open(FaqCategoryFormDialogComponent, {
      width: '500px',
      data: faqCategory,
    });
  }

  openFaqFormDialog(faq: Faq): MatDialogRef<FaqFormDialogComponent, Faq> {
    return this.dialog.open(FaqFormDialogComponent, {
      width: '500px',
      data: faq,
    });
  }

  putFaqCategory(faqCategory: FaqCategory): Observable<FaqCategory> {
    // TODO: Rest Call
    const catToUpdate = this.findFaqCategoryById(faqCategory.id);
    catToUpdate.title = faqCategory.title;
    catToUpdate.description = faqCategory.description;
    catToUpdate.icon = faqCategory.icon;
    return of(catToUpdate);
  }

  postFaqCategory(faqCategory: FaqCategory): Observable<FaqCategory> {
    // TODO: Rest Call
    this.faqCategories.push(faqCategory);
    this.faqCategorie$.next(this.getFaqCategories());
    return of(faqCategory);
  }
}
