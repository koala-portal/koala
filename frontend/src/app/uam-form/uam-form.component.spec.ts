import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UamFormComponent } from './uam-form.component';

describe('UamFormComponent', () => {
  let component: UamFormComponent;
  let fixture: ComponentFixture<UamFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UamFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UamFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
