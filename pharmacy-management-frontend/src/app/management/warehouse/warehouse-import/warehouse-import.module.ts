import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { WarehouseImportRoutingModule } from './warehouse-import-routing.module';
import { WarehouseImportDrugListComponent } from './warehouse-import-drug-list/warehouse-import-drug-list.component';


@NgModule({
  declarations: [WarehouseImportDrugListComponent],
  imports: [
    CommonModule,
    WarehouseImportRoutingModule
  ]
})
export class WarehouseImportModule { }
