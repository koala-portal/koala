import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

import { KTool } from 'src/app/shared/k-tool.model';

@Component({
  selector: 'app-k-tool-form',
  templateUrl: './k-tool-form.component.html',
  styleUrls: ['./k-tool-form.component.scss'],
})
export class KToolFormComponent implements OnInit {
  @Input() kTool: KTool;

  @Output() formSubmit: EventEmitter<KTool> = new EventEmitter();
  @Output() cancel: EventEmitter<void> = new EventEmitter();

  kToolForm = this.fb.group({
    id: [null],
    name: ['', Validators.required],
    url: ['', Validators.required],
    description: ['', Validators.required],
    numUsers: [0, Validators.required],
    starred: false,
  });

  constructor(private fb: FormBuilder) {}

  ngOnInit(): void {
    if (this.kTool) {
      this.kToolForm.patchValue(this.kTool);
    }
  }

  onSubmit(kToolForm: FormGroup): void {
    this.formSubmit.emit(kToolForm.value);
  }

  onClickCancel(): void {
    this.cancel.emit();
  }
}
