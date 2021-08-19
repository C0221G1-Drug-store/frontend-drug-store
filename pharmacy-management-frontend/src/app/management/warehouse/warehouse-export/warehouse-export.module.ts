import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { WarehouseExportRoutingModule } from './warehouse-export-routing.module';
import { ExportBillRefundComponent } from './export-bill-refund/export-bill-refund.component';
import {MatSelectModule} from '@angular/material/select';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {NgxPaginationModule} from 'ngx-pagination';
import {NgxPrintModule} from 'ngx-print';
import { DialogComponent } from './dialog/dialog.component';
import {MatIconModule} from '@angular/material/icon';
import {MatDialogModule} from '@angular/material/dialog';
import {MatButtonModule} from '@angular/material/button';
import {MatSnackBarModule} from '@angular/material/snack-bar';
import {CustomCurrencyPipe} from "./custom-currency.pipe"
import {NgxMatSelectSearchModule} from 'ngx-mat-select-search';
import {ExportBillListComponent} from "./export-bill-list/export-bill-list.component";
import {ExportBillDeleteComponent} from "./export-bill-delete/export-bill-delete.component";
import {ExportBillPrintComponent} from "./export-bill-print/export-bill-print.component";

@NgModule({
  declarations: [ExportBillListComponent, ExportBillDeleteComponent, ExportBillPrintComponent, ExportBillRefundComponent, DialogComponent,CustomCurrencyPipe],
  exports: [
    ExportBillListComponent
  ],
    imports: [
      CommonModule,
      WarehouseExportRoutingModule,
      MatSelectModule,
      FormsModule,
      NgxPaginationModule,
      ReactiveFormsModule,
      NgxPrintModule,
      MatIconModule,
      MatDialogModule,
      MatButtonModule,
      MatSnackBarModule,
      NgxMatSelectSearchModule,
    ],
  providers: []
})
export class WarehouseExportModule { }
