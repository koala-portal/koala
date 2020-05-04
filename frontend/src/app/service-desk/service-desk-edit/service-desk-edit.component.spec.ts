import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ServiceDeskEditComponent } from './service-desk-edit.component';

describe('ServiceDeskEditComponent', () => {
  let component: ServiceDeskEditComponent;
  let fixture: ComponentFixture<ServiceDeskEditComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ServiceDeskEditComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ServiceDeskEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
