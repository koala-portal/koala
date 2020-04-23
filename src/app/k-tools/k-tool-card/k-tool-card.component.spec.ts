import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { KToolCardComponent } from './k-tool-card.component';

describe('KToolCardComponent', () => {
  let component: KToolCardComponent;
  let fixture: ComponentFixture<KToolCardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ KToolCardComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(KToolCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
