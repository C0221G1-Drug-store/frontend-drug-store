import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { WarehouseExportRoutingModule } from './warehouse-export-routing.module';
import { ExportBillRefundComponent } from './export-bill-refund/export-bill-refund.component';


@NgModule({
  declarations: [ExportBillRefundComponent],
  imports: [
    CommonModule,
    WarehouseExportRoutingModule
  ]
})
export class WarehouseExportModule { }
