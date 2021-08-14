import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { WarehouseExportRoutingModule } from './warehouse-export-routing.module';
<<<<<<< HEAD
import { ExportBillRefundComponent } from './export-bill-refund/export-bill-refund.component';


@NgModule({
  declarations: [ExportBillRefundComponent],
=======
import { ExportBillDestroyComponent } from './export-bill-destroy/export-bill-destroy.component';


@NgModule({
  declarations: [ExportBillDestroyComponent],
>>>>>>> 42fa1997646221384241896f84cc8ddcb05542d0
  imports: [
    CommonModule,
    WarehouseExportRoutingModule
  ]
})
export class WarehouseExportModule { }
