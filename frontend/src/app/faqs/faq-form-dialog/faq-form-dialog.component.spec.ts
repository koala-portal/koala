import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FaqFormDialogComponent } from './faq-form-dialog.component';

describe('FaqFormDialogComponent', () => {
  let component: FaqFormDialogComponent;
  let fixture: ComponentFixture<FaqFormDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FaqFormDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FaqFormDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
