import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ReleaseNotesFormDialogComponent } from './release-notes-form-dialog.component';

describe('ReleaseNotesFormDialogComponent', () => {
  let component: ReleaseNotesFormDialogComponent;
  let fixture: ComponentFixture<ReleaseNotesFormDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ReleaseNotesFormDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ReleaseNotesFormDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
