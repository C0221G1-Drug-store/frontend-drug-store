import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {WarehouseImportRoutingModule} from './warehouse-import-routing.module';

import {WarehouseImportDrugListComponent} from './warehouse-import-drug-list/warehouse-import-drug-list.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';


@NgModule({
  declarations: [WarehouseImportDrugListComponent],
    imports: [
        CommonModule,
        WarehouseImportRoutingModule,
        FormsModule,
        ReactiveFormsModule
    ]
})
export class WarehouseImportModule {
}
