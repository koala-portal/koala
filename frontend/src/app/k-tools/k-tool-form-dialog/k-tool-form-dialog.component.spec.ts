import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { KToolFormDialogComponent } from './k-tool-form-dialog.component';

describe('KToolFormDialogComponent', () => {
  let component: KToolFormDialogComponent;
  let fixture: ComponentFixture<KToolFormDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ KToolFormDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(KToolFormDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
