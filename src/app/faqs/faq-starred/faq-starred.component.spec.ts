import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FaqStarredComponent } from './faq-starred.component';

describe('FaqStarredComponent', () => {
  let component: FaqStarredComponent;
  let fixture: ComponentFixture<FaqStarredComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [FaqStarredComponent],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FaqStarredComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
