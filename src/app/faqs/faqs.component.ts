import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { Faq } from './faq.model';

@Component({
  selector: 'app-faqs',
  templateUrl: './faqs.component.html',
  styleUrls: ['./faqs.component.scss'],
})
export class FaqsComponent implements OnInit {
  @Output() faqWasSelected = new EventEmitter<Faq>();

  faqs: Faq[] = [
    new Faq('Test 1', 'Another 1 test', 'General', false),
    new Faq('Test 2', 'Another 2 test', 'Topic Two', false),
    new Faq('Test 3', 'Another 3 test', 'Topic Three', false),
    new Faq('Test 4', 'Another 4 test', 'Topic Four', true),
    new Faq('Test 5', 'Another 5 test', 'Topic Five', true),
    new Faq('Test 6', 'Another  6 test', 'Topic Three', true),
    new Faq('Test 7', 'Another 7  test', 'Topic Six', false),
    new Faq('Test 8', 'Another 8 test', 'General', true),
  ];

  faqCategories = [
    {
      title: 'General',
      description: 'Start with the basics',
      icon: 'fa-life-saver',
    },
    {
      title: 'Topic One',
      description: 'Start with the basics',
      icon: 'fa-lemon-o',
    },
    {
      title: 'Topic Two',
      description: 'Start with the basics',
      icon: 'fa-plug',
    },
    {
      title: 'Topic Three',
      description: 'Start with the basics',
      icon: 'fa-rocket',
    },
    {
      title: 'Topic Four',
      description: 'Start with the basics',
      icon: 'fa-code',
    },
    {
      title: 'Topic Five',
      description: 'Start with the basics',
      icon: 'fa-terminal',
    },
    {
      title: 'Topic Six',
      description: 'Start with the basics',
      icon: 'fa-plug',
    },
  ];

  constructor() {}

  ngOnInit(): void {}

  // TO DO  on the faq categories click filter the faqs to that specific value (ie Topic Six should filter to show only test 7)

  onFaqSelected(faq: Faq) {
    console.log('faq clicked');
    this.faqWasSelected.emit(faq);
  }
}
