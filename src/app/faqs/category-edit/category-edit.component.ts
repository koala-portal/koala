import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';

import { FaqCategory } from '../faq-category.model';

@Component({
  selector: 'app-category-edit',
  templateUrl: './category-edit.component.html',
  styleUrls: ['./category-edit.component.scss'],
})
export class CategoryEditComponent implements OnInit {
  constructor() {}

  ngOnInit(): void {}

  onSubmit(form: NgForm): void {
    alert('TODO: onSubmit');
    console.log(form.value);
  }
}
