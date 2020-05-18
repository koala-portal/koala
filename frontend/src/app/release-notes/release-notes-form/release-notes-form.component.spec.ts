import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ReleaseNotesFormComponent } from './release-notes-form.component';

describe('ReleaseNotesFormComponent', () => {
  let component: ReleaseNotesFormComponent;
  let fixture: ComponentFixture<ReleaseNotesFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ReleaseNotesFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ReleaseNotesFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
