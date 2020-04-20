import { Faq } from './faq.model';

export interface FaqCategory {
  description: string;
  title: string;
  icon: string;
  faqs: Faq[];
}
