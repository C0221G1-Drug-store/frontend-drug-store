import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ExportBillDestroyComponent } from './export-bill-destroy.component';

describe('ExportBillDestroyComponent', () => {
  let component: ExportBillDestroyComponent;
  let fixture: ComponentFixture<ExportBillDestroyComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ExportBillDestroyComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ExportBillDestroyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
