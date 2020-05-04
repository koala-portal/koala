import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ServiceDeskListComponent } from './service-desk-list.component';

describe('ServiceDeskListComponent', () => {
  let component: ServiceDeskListComponent;
  let fixture: ComponentFixture<ServiceDeskListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ServiceDeskListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ServiceDeskListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
