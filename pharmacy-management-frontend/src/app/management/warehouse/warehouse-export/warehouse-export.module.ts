import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { WarehouseExportRoutingModule } from './warehouse-export-routing.module';
import { ExportBillDestroyComponent } from './export-bill-destroy/export-bill-destroy.component';


@NgModule({
  declarations: [ExportBillDestroyComponent],
  imports: [
    CommonModule,
    WarehouseExportRoutingModule
  ]
})
export class WarehouseExportModule { }
