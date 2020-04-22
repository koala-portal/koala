import { Injectable } from '@angular/core';
import { FaqCategory } from './faq-category.model';
import { Faq } from './faq.model';
import { Observable, of, Subject } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class FaqsService {
  faqCategorie$ = new Subject<FaqCategory[]>();
  private faqCategories: FaqCategory[] = [
    {
      id: 'a',
      title: 'General',
      description: 'General Questions',
      icon: 'fa-life-saver',
    },
    {
      id: 'b',
      title: 'One',
      description:
        'One Questions and other things related to the One. This is just going to be a very long description and you are going to have to deal with that.',
      icon: 'fa-address-card',
    },
  ];

  faq$ = new Subject<Faq[]>();
  private faqs: Faq[] = [
    {
      id: 'a',
      title: 'How do I do the thing?',
      description: 'You can do the thing in a number of ways.',
      starred: true,
      created: new Date(),
      createdBy: 'user1',
      updated: null,
      updatedBy: null,
      category: this.faqCategories[0],
    },
    {
      id: 'b',
      title: 'If I do it this way, how can it be done?',
      description: 'You should do the thing the way we told you.',
      starred: true,
      created: new Date(),
      createdBy: 'user2',
      updated: null,
      updatedBy: null,
      category: this.faqCategories[0],
    },
    {
      id: 'c',
      title: 'I think I am doing this wrong. Am I doing this wrong?',
      description: 'Yes you should consider doing it the other way.',
      starred: true,
      created: new Date(),
      createdBy: 'user1',
      updated: new Date(),
      updatedBy: 'user1',
      category: this.faqCategories[1],
    },
  ];

  getFaqCategories(): FaqCategory[] {
    return this.faqCategories.slice();
  }

  getFaqs(): Faq[] {
    return this.faqs.slice();
  }

  findFaqById(id: string): Faq {
    return this.faqs.find((faq) => faq.id === id);
  }

  findAllByFaqCategory(faqCategory: FaqCategory): Faq[] {
    return this.faqs.filter((faq) => faq.category.id === faqCategory.id);
  }

  findAllByStarred(starred: boolean): Faq[] {
    return this.faqs.filter((faq) => faq.starred === starred);
  }

  findFaqCategoryById(id: string): FaqCategory {
    return this.faqCategories.find((cat) => cat.id === id);
  }

  starFaq(faq: Faq): Observable<Faq> {
    faq.starred = !faq.starred;
    return this.put(faq);
  }

  putFaqCategory(faqCategory: FaqCategory): Observable<FaqCategory> {
    // TODO: Rest Call
    this.faqCategories.splice(
      this.faqs.findIndex(
        (faqCategoryIt) => faqCategoryIt.id === faqCategory.id
      ),
      1,
      faqCategory
    );
    this.faqCategorie$.next(this.getFaqCategories());
    return of(faqCategory);
  }

  postFaqCategory(faqCategory: FaqCategory): Observable<FaqCategory> {
    // TODO: Rest Call
    this.faqCategories.push(faqCategory);
    this.faqCategorie$.next(this.getFaqCategories());
    return of(faqCategory);
  }

  deleteFaqCategory(faqCategory: FaqCategory): Observable<void> {
    this.faqCategories = this.faqCategories.filter(
      (faqCategoryIt) => faqCategory.id !== faqCategoryIt.id
    );
    this.faqCategorie$.next(this.getFaqCategories());
    return of();
  }

  put(faq: Faq): Observable<Faq> {
    // TODO: Rest Call
    this.faqs.splice(
      this.faqs.findIndex((faqIt) => faqIt.id === faq.id),
      1,
      faq
    );
    return of(faq);
  }

  post(faq: Faq): Observable<Faq> {
    // TODO: Rest Call
    this.faqs.push(faq);
    this.faq$.next(this.getFaqs());
    return of(faq);
  }

  delete(faqToDelete: Faq): Observable<void> {
    // TODO: Rest Call
    this.faqs = this.faqs.filter((faq) => faqToDelete.id !== faq.id);
    this.faq$.next(this.getFaqs());
    return of();
  }
}
