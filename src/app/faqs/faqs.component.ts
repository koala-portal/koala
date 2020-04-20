import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { Faq } from './faq.model';
import { FaqCategory } from './faq-category.model';
import { FaqsService } from './faqs.service';
import { DialogService } from '../shared/dialog.service';

@Component({
  selector: 'app-faqs',
  templateUrl: './faqs.component.html',
  styleUrls: ['./faqs.component.scss'],
})
export class FaqsComponent {}
