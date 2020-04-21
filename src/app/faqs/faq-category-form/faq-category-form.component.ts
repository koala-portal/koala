import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { FaqCategory } from '../faq-category.model';

@Component({
  selector: 'app-faq-category-form',
  templateUrl: './faq-category-form.component.html',
  styleUrls: ['./faq-category-form.component.scss'],
})
export class FaqCategoryFormComponent implements OnInit {
  @Input() faqCategory: FaqCategory;

  @Output() formSubmit: EventEmitter<FaqCategory> = new EventEmitter();

  faqCategoryForm = this.fb.group({
    id: [''],
    title: ['', Validators.required],
    description: ['', Validators.required],
    icon: ['', Validators.required],
    faqs: [[]],
  });

  constructor(private fb: FormBuilder) {}

  ngOnInit(): void {
    if (this.faqCategory) {
      this.faqCategoryForm.patchValue(this.faqCategory);
    }
  }

  onSubmit(form: FormGroup): void {
    this.formSubmit.emit(form.value);
  }
}
