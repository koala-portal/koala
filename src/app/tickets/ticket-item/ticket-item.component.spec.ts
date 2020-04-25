import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TickeItemComponent } from './ticket-item.component';

describe('TickeItemComponent', () => {
  let component: TickeItemComponent;
  let fixture: ComponentFixture<TickeItemComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [TickeItemComponent],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TickeItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
