import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ExportBillPrintComponent } from './export-bill-print.component';

describe('ExportBillPrintComponent', () => {
  let component: ExportBillPrintComponent;
  let fixture: ComponentFixture<ExportBillPrintComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ExportBillPrintComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ExportBillPrintComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
