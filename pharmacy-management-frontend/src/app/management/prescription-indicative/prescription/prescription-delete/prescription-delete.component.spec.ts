import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PrescriptionDeleteComponent } from './prescription-delete.component';

describe('PrescriptionDeleteComponent', () => {
  let component: PrescriptionDeleteComponent;
  let fixture: ComponentFixture<PrescriptionDeleteComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PrescriptionDeleteComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PrescriptionDeleteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
