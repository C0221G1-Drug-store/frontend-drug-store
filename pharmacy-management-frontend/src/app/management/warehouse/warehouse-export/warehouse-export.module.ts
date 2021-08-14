import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { WarehouseExportRoutingModule } from './warehouse-export-routing.module';
import { ExportBillListComponent } from './export-bill-list/export-bill-list.component';
import {HttpClientModule} from "@angular/common/http";
import { ExportBillDeleteComponent } from './export-bill-delete/export-bill-delete.component';
import { ExportBillPrintComponent } from './export-bill-print/export-bill-print.component';


@NgModule({
  declarations: [ExportBillListComponent, ExportBillDeleteComponent, ExportBillPrintComponent],
  exports: [
    ExportBillListComponent
  ],
  imports: [
    CommonModule,
    WarehouseExportRoutingModule,
    HttpClientModule,
  ],
  providers: []
})
export class WarehouseExportModule { }
