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
  @Output() cancel: EventEmitter<void> = new EventEmitter();

  faqCategoryForm = this.fb.group({
    id: [''],
    title: ['', Validators.required],
    description: ['', Validators.required],
    icon: ['', Validators.required],
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

  onClickCancel(): void {
    this.cancel.emit();
  }
}
