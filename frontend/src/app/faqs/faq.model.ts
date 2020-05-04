import { FaqCategory } from './faq-category.model';

export interface Faq {
  id: string;
  title: string;
  description: string;
  starred: boolean;
  created: Date;
  createdBy: string;
  updated: Date;
  updatedBy: string;
  category: FaqCategory;
}
