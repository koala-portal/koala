import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

import { Faq } from '../faq.model';
import { FaqCategory } from '../faq-category.model';
import { FaqsService } from '../faqs.service';

@Component({
  selector: 'app-faq-form',
  templateUrl: './faq-form.component.html',
  styleUrls: ['./faq-form.component.scss'],
})
export class FaqFormComponent implements OnInit {
  @Input() faq: Faq;
  @Input() category: FaqCategory;

  @Output() formSubmit: EventEmitter<Faq> = new EventEmitter();
  @Output() cancel: EventEmitter<void> = new EventEmitter();

  faqCategories: FaqCategory[];

  faqForm = this.fb.group({
    id: [''],
    category: [this.category, Validators.required],
    title: ['', Validators.required],
    description: ['', Validators.required],
    starred: false,
  });

  constructor(private fb: FormBuilder, private faqsService: FaqsService) {}

  ngOnInit(): void {
    debugger;
    this.faqCategories = this.faqsService.getFaqCategories();
    if (this.faq) {
      this.faqForm.patchValue(this.faq);
    }
    if (this.category) {
      this.faqForm.patchValue({ category: this.category });
    }
  }

  onSubmit(form: FormGroup): void {
    this.formSubmit.emit(form.value);
  }

  onClickCancel(): void {
    this.cancel.emit();
  }

  compareFaqCategories(cat1: any, cat2: any): boolean {
    return cat1 && cat2 && cat1.id === cat2.id;
  }
}
