import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {WarehouseImportRoutingModule} from './warehouse-import-routing.module';
import {WarehouseImportCreateComponent} from './warehouse-import-create/warehouse-import-create.component';
import {WarehouseImportDrugListComponent} from './warehouse-import-drug-list/warehouse-import-drug-list.component';
import {WarehouseImportInvoiceInformationComponent} from './warehouse-import-invoice-information/warehouse-import-invoice-information.component';
import {WarehouseImportPaymentComponent} from './warehouse-import-payment/warehouse-import-payment.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import { ArrayNumPipe } from './warehouse-import-drug-list/array-num.pipe';


@NgModule({
  declarations: [WarehouseImportCreateComponent, WarehouseImportDrugListComponent, WarehouseImportInvoiceInformationComponent, WarehouseImportPaymentComponent, ArrayNumPipe],
  imports: [
    CommonModule,
    WarehouseImportRoutingModule,
    ReactiveFormsModule,
    FormsModule
  ]
})
export class WarehouseImportModule {
}
