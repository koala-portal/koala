import { Faq } from './faq.model';

export interface FaqCategory {
  id: string;
  description: string;
  title: string;
  icon: string;
  faqs: Faq[];
}
