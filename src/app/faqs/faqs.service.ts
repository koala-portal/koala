import { Injectable } from '@angular/core';
import { FaqCategory } from './faq-category.model';
import { Faq } from './faq.model';

@Injectable({ providedIn: 'root' })
export class FaqsService {
  private faqCategories: FaqCategory[] = [
    {
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

  getFaqCategories(): FaqCategory[] {
    return this.faqCategories.slice();
  }

  getFaqs(): Faq[] {
    return this.faqCategories.flatMap((category) => category.faqs);
  }

  starFaq(faq: Faq): void {
    faq.starred = !faq.starred;
  }

  deleteFaq(faqToDelete: Faq): void {
    this.faqCategories.forEach((category) => {
      category.faqs = category.faqs.filter((faq) => faqToDelete.id !== faq.id);
    });
  }
}
