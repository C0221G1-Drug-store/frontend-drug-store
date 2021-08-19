import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {WarehouseImportRoutingModule} from './warehouse-import-routing.module';

import {WarehouseImportDrugListComponent} from './warehouse-import-drug-list/warehouse-import-drug-list.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import { WarehouseImportDerugDeleteComponent } from './warehouse-import-derug-delete/warehouse-import-derug-delete.component';
import {MatDialogModule} from '@angular/material/dialog';


@NgModule({
  declarations: [WarehouseImportDrugListComponent, WarehouseImportDerugDeleteComponent],
  imports: [
    CommonModule,
    WarehouseImportRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    MatDialogModule
  ]
})
export class WarehouseImportModule {
}
