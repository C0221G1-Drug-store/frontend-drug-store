import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { WarehouseRoutingModule } from './warehouse-routing.module';
import {DrugRoutingModule} from './drug/drug-routing.module';


@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    WarehouseRoutingModule,
    DrugRoutingModule
  ]
})
export class WarehouseModule { }
