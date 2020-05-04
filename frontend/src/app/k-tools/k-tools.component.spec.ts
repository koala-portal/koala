import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { KToolsComponent } from './k-tools.component';

describe('KToolsComponent', () => {
  let component: KToolsComponent;
  let fixture: ComponentFixture<KToolsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ KToolsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(KToolsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
