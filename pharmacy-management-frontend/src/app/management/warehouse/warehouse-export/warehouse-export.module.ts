import {LOCALE_ID, NgModule} from '@angular/core';
import { CommonModule } from '@angular/common';

import { WarehouseExportRoutingModule } from './warehouse-export-routing.module';
import { ExportBillDestroyComponent } from './export-bill-destroy/export-bill-destroy.component';
import {ReactiveFormsModule} from "@angular/forms";
import {NgxPaginationModule} from "ngx-pagination";
import { ExportBillRefundComponent } from './export-bill-refund/export-bill-refund.component';
import { DialogConfirmComponent } from './dialog-confirm/dialog-confirm.component';
import {MatSelectModule} from "@angular/material/select";
import {NgxMatSelectSearchModule} from "ngx-mat-select-search";
import {MatDialogModule} from "@angular/material/dialog";
import {CustomCurrencyPipe} from "./custom-currency.pipe";


@NgModule({
  declarations: [ExportBillDestroyComponent, ExportBillRefundComponent, DialogConfirmComponent, CustomCurrencyPipe],
  imports: [
    CommonModule,
    WarehouseExportRoutingModule,
    ReactiveFormsModule,
    NgxPaginationModule,
    MatSelectModule,
    NgxMatSelectSearchModule,
    MatDialogModule,
  ],
})
export class WarehouseExportModule { }
