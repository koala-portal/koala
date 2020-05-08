import { Injectable, EventEmitter, Output } from '@angular/core';
import { FaqCategory } from './faq-category.model';
import { HttpEmitAction } from '../shared/http-emit-action.model';
import { Faq } from './faq.model';
import { Observable, of, Subject } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({ providedIn: 'root' })
export class FaqsService {

  @Output() saveFaqCategoriesEmitter: EventEmitter<FaqCategory> = new EventEmitter<FaqCategory>();
  @Output() updateFaqCategoriesEmitter: EventEmitter<FaqCategory> = new EventEmitter<FaqCategory>();

  @Output() saveFaqEmitter: EventEmitter<Faq> = new EventEmitter<Faq>();
  @Output() updateFaqEmitter: EventEmitter<Faq> = new EventEmitter<Faq>();

  constructor(
    private http: HttpClient
  ) {}

  faqCategorie$ = new Subject<FaqCategory[]>();

  faq$ = new Subject<Faq[]>();
  private faqs: Faq[] = [];

  public loadFaqCategories(): Observable<FaqCategory[]> {
    var url = 'https://localhost:8443/api/faqCategory';
    return this.http.get<FaqCategory[]>(url); 
  }

  public saveFaqCategory(faqCategory: FaqCategory): HttpEmitAction<FaqCategory> {
    var url = 'https://localhost:8443/api/faqCategory';

    const returnVal: HttpEmitAction<FaqCategory> = {
      obser: this.http.post<FaqCategory>(url, faqCategory),
      emit: this.saveFaqCategoriesEmitter,
      action: "SAVE"
    };

    return returnVal;
  }

  public updateFaqCategory(faqCategory: FaqCategory): HttpEmitAction<FaqCategory> {
    var url = 'https://localhost:8443/api/faqCategory';

    const returnVal: HttpEmitAction<FaqCategory> = {
      obser: this.http.put<FaqCategory>(url, faqCategory),
      emit: this.updateFaqCategoriesEmitter,
      action: "UPDATE"
    };

    return returnVal;
  }

  public deleteFaqCategory(faqCategory: FaqCategory): Observable<void> {
    var url = 'https://localhost:8443/api/faqCategory/' + faqCategory.id;
    return this.http.delete<void>(url);
  }

  public loadFaqs(id: Number): Observable<Faq[]> {
    var url = 'https://localhost:8443/api/faqs/' + id;
    return this.http.get<Faq[]>(url);
  }

  public saveFaq(faq: Faq): HttpEmitAction<Faq> {
    var url = 'https://localhost:8443/api/faq';

    const returnVal: HttpEmitAction<Faq> = {
      obser: this.http.post<Faq>(url, faq),
      emit: this.saveFaqEmitter,
      action: "SAVE"
    };

    return returnVal;
  }

  public updateFaq(faq: Faq): HttpEmitAction<Faq> {
    var url = 'https://localhost:8443/api/faq';

    const returnVal: HttpEmitAction<Faq> = {
      obser: this.http.put<Faq>(url, faq),
      emit: this.updateFaqEmitter,
      action: "UPDATE"
    };

    return returnVal;
  }

  public viewedFaq(faq: Faq): Observable<void> {
    var url = 'https://localhost:8443/api/faq/' + faq.id;
    return this.http.put<void>(url, null);
  }

  public deleteFaq(faqToDelete: Faq): Observable<void> {
    var url = 'https://localhost:8443/api/faq/' + faqToDelete.id;
    return this.http.delete<void>(url);
  }
}
