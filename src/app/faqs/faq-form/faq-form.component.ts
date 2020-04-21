import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

import { Faq } from '../faq.model';

@Component({
  selector: 'app-faq-form',
  templateUrl: './faq-form.component.html',
  styleUrls: ['./faq-form.component.scss'],
})
export class FaqFormComponent implements OnInit {
  @Input() faq: Faq;

  @Output() formSubmit: EventEmitter<Faq> = new EventEmitter();

  faqForm = this.fb.group({
    id: [''],
    title: ['', Validators.required],
    description: ['', Validators.required],
    starred: false,
  });

  constructor(private fb: FormBuilder) {}

  ngOnInit(): void {
    if (this.faq) {
      this.faqForm.patchValue(this.faq);
    }
  }

  onSubmit(form: FormGroup): void {
    this.formSubmit.emit(form.value);
  }
}
