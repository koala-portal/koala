import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { KToolItemComponent } from './k-tool-item.component';

describe('KToolItemComponent', () => {
  let component: KToolItemComponent;
  let fixture: ComponentFixture<KToolItemComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [KToolItemComponent],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(KToolItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
