import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FaqTopTenComponent } from './faq-top-ten.component';

describe('FaqTopTenComponent', () => {
  let component: FaqTopTenComponent;
  let fixture: ComponentFixture<FaqTopTenComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FaqTopTenComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FaqTopTenComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
