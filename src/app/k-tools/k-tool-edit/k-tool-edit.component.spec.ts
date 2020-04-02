import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { KToolEditComponent } from './k-tool-edit.component';

describe('KToolEditComponent', () => {
  let component: KToolEditComponent;
  let fixture: ComponentFixture<KToolEditComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ KToolEditComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(KToolEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
