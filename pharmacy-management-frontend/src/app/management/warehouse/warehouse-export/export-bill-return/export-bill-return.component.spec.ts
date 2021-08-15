import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ExportBillReturnComponent } from './export-bill-return.component';

describe('ExportBillReturnComponent', () => {
  let component: ExportBillReturnComponent;
  let fixture: ComponentFixture<ExportBillReturnComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ExportBillReturnComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ExportBillReturnComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
