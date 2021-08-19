import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ExportBillDeleteComponent } from './export-bill-delete.component';

describe('ExportBillDeleteComponent', () => {
  let component: ExportBillDeleteComponent;
  let fixture: ComponentFixture<ExportBillDeleteComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ExportBillDeleteComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ExportBillDeleteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
