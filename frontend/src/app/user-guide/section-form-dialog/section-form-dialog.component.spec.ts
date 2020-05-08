import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SectionFormDialogComponent } from './section-form-dialog.component';

describe('SectionFormDialogComponent', () => {
  let component: SectionFormDialogComponent;
  let fixture: ComponentFixture<SectionFormDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SectionFormDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SectionFormDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
