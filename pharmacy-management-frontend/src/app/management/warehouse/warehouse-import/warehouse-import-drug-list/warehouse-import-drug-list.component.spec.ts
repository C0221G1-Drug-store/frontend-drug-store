import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WarehouseImportDrugListComponent } from './warehouse-import-drug-list.component';

describe('WarehouseImportDrugListComponent', () => {
  let component: WarehouseImportDrugListComponent;
  let fixture: ComponentFixture<WarehouseImportDrugListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WarehouseImportDrugListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WarehouseImportDrugListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
