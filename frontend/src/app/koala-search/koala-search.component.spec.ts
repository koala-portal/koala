import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { KoalaSearchComponent } from './koala-search.component';

describe('KoalaSearchComponent', () => {
  let component: KoalaSearchComponent;
  let fixture: ComponentFixture<KoalaSearchComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ KoalaSearchComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(KoalaSearchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
