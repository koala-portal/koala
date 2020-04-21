import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FaqCategoryFormDialogComponent } from './faq-category-form-dialog.component';

describe('FaqCategoryFormDialogComponent', () => {
  let component: FaqCategoryFormDialogComponent;
  let fixture: ComponentFixture<FaqCategoryFormDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FaqCategoryFormDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FaqCategoryFormDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
