import { Section } from './../section.model';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-section-form',
  templateUrl: './section-form.component.html',
  styleUrls: ['./section-form.component.scss'],
})
export class SectionFormComponent implements OnInit {
  @Input() section: Section;

  @Output() submit = new EventEmitter<Section>();

  form = this.fb.group({
    id: [''],
    title: ['', Validators.required],
    content: ['', Validators.required],
  });

  constructor(private fb: FormBuilder) {}

  ngOnInit(): void {
    this.form.patchValue(this.section);
  }

  onSubmit(form: FormGroup): void {
    this.submit.emit(form.value);
  }
}
