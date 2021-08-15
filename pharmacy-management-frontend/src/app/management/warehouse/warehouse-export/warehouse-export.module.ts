import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { WarehouseExportRoutingModule } from './warehouse-export-routing.module';
import { ExportBillDestroyComponent } from './export-bill-destroy/export-bill-destroy.component';
import { ExportBillReturnComponent } from './export-bill-return/export-bill-return.component';
import {ReactiveFormsModule} from "@angular/forms";
import {NgxPaginationModule} from "ngx-pagination";


@NgModule({
  declarations: [ExportBillDestroyComponent, ExportBillReturnComponent],
  imports: [
    CommonModule,
    WarehouseExportRoutingModule,
    ReactiveFormsModule,
    NgxPaginationModule,

  ]
})
export class WarehouseExportModule { }
