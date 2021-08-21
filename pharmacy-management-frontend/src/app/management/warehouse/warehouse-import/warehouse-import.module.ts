import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {WarehouseImportRoutingModule} from './warehouse-import-routing.module';
import {WarehouseImportCreateComponent} from './warehouse-import-create/warehouse-import-create.component';
import {WarehouseImportDrugListComponent} from './warehouse-import-drug-list/warehouse-import-drug-list.component';
import {WarehouseImportInvoiceInformationComponent} from './warehouse-import-invoice-information/warehouse-import-invoice-information.component';
import {WarehouseImportPaymentComponent} from './warehouse-import-payment/warehouse-import-payment.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import { ArrayNumPipe } from './warehouse-import-drug-list/array-num.pipe';
import { WarehouseImportDerugDeleteComponent } from './warehouse-import-derug-delete/warehouse-import-derug-delete.component';
import {MatDialogModule} from '@angular/material/dialog';
import { ImportListDrugComponent } from './import-list-drug/import-list-drug.component';
@NgModule({
  declarations: [WarehouseImportCreateComponent, WarehouseImportDrugListComponent, WarehouseImportInvoiceInformationComponent, WarehouseImportPaymentComponent, ArrayNumPipe,WarehouseImportDrugListComponent, WarehouseImportDerugDeleteComponent, ImportListDrugComponent],
  imports: [
    CommonModule,
    WarehouseImportRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    MatDialogModule
  ]
})
export class WarehouseImportModule {
}
