import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';

import { ReleaseNotes } from '../release-notes.model';

@Component({
  selector: 'app-release-notes-form',
  templateUrl: './release-notes-form.component.html',
  styleUrls: ['./release-notes-form.component.scss'],
})
export class ReleaseNotesFormComponent implements OnInit {
  @Input() releaseNotes: ReleaseNotes;

  @Output() formSubmit = new EventEmitter<ReleaseNotes>();
  @Output() cancel = new EventEmitter<void>();

  form = this.fb.group({
    id: null,
    kTool: null,
    name: ['', Validators.required],
    releaseDate: [new Date(), Validators.required],
    versionNumber: ['1.0', Validators.required],
    description: ['', Validators.required],
  });

  constructor(private fb: FormBuilder) {}

  ngOnInit(): void {
    this.form.patchValue(this.releaseNotes);
  }

  onSubmit(): void {
    this.formSubmit.emit(this.form.value);
  }

  onClickCancel(): void {
    this.cancel.emit();
  }
}
