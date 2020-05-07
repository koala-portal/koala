import { FaqCategory } from './faq-category.model';

export interface Faq {
  id: number;
  title: string;
  description: string;
  info: string;
  //updated: Date;
  timesViewed: number;
  category: FaqCategory;
}