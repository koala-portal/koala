import { Injectable, EventEmitter, Output } from '@angular/core';
import { FaqCategory } from './faq-category.model';
import { HttpEmitAction } from '../shared/http-emit-action.model';
import { Faq } from './faq.model';
import { Observable, Subject } from 'rxjs';
import { BaseRestServices } from '../shared/base-rest.services';

@Injectable({ providedIn: 'root' })
export class FaqsService extends BaseRestServices {

  @Output() saveFaqCategoriesEmitter: EventEmitter<FaqCategory> = new EventEmitter<FaqCategory>();
  @Output() updateFaqCategoriesEmitter: EventEmitter<FaqCategory> = new EventEmitter<FaqCategory>();

  @Output() saveFaqEmitter: EventEmitter<Faq> = new EventEmitter<Faq>();
  @Output() updateFaqEmitter: EventEmitter<Faq> = new EventEmitter<Faq>();

  constructor() {
    super();
  }

  faqCategorie$ = new Subject<FaqCategory[]>();

  faq$ = new Subject<Faq[]>();
  private faqs: Faq[] = [];

  public loadFaqCategories(): Observable<FaqCategory[]> {
    var url = super.getBaseHost() + '/api/faqCategory';
    return super.getHttpClient().get<FaqCategory[]>(url); 
  }

  public saveFaqCategory(faqCategory: FaqCategory): HttpEmitAction<FaqCategory> {
    var url = super.getBaseHost() + '/api/faqCategory';

    const returnVal: HttpEmitAction<FaqCategory> = {
      obser: super.getHttpClient().post<FaqCategory>(url, faqCategory),
      emit: this.saveFaqCategoriesEmitter,
      action: "SAVE"
    };

    return returnVal;
  }

  public updateFaqCategory(faqCategory: FaqCategory): HttpEmitAction<FaqCategory> {
    var url = super.getBaseHost() + '/api/faqCategory';

    const returnVal: HttpEmitAction<FaqCategory> = {
      obser: super.getHttpClient().put<FaqCategory>(url, faqCategory),
      emit: this.updateFaqCategoriesEmitter,
      action: "UPDATE"
    };

    return returnVal;
  }

  public deleteFaqCategory(faqCategory: FaqCategory): Observable<void> {
    var url = super.getBaseHost() + '/api/faqCategory/' + faqCategory.id;
    return super.getHttpClient().delete<void>(url);
  }

  public loadFaqs(id: Number): Observable<Faq[]> {
    var url = super.getBaseHost() + '/api/faqs/' + id;
    return super.getHttpClient().get<Faq[]>(url);
  }

  public saveFaq(faq: Faq): HttpEmitAction<Faq> {
    var url = super.getBaseHost() + '/api/faq';

    const returnVal: HttpEmitAction<Faq> = {
      obser: super.getHttpClient().post<Faq>(url, faq),
      emit: this.saveFaqEmitter,
      action: "SAVE"
    };

    return returnVal;
  }

  public updateFaq(faq: Faq): HttpEmitAction<Faq> {
    var url = super.getBaseHost() + '/api/faq';

    const returnVal: HttpEmitAction<Faq> = {
      obser: super.getHttpClient().put<Faq>(url, faq),
      emit: this.updateFaqEmitter,
      action: "UPDATE"
    };

    return returnVal;
  }

  public viewedFaq(faq: Faq): Observable<void> {
    var url = super.getBaseHost() + '/api/faq/' + faq.id;
    return super.getHttpClient().put<void>(url, null);
  }

  public deleteFaq(faqToDelete: Faq): Observable<void> {
    var url = super.getBaseHost() + '/api/faq/' + faqToDelete.id;
    return super.getHttpClient().delete<void>(url);
  }
}
