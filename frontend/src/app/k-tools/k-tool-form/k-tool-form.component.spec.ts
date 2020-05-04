import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { KToolFormComponent } from './k-tool-form.component';

describe('KToolFormComponent', () => {
  let component: KToolFormComponent;
  let fixture: ComponentFixture<KToolFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ KToolFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(KToolFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
