import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ExportBillListComponent } from './export-bill-list.component';

describe('ExportBillListComponent', () => {
  let component: ExportBillListComponent;
  let fixture: ComponentFixture<ExportBillListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ExportBillListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ExportBillListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
