import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DrugGroupRoutingModule } from './drug-group-routing.module';
import {DrugGroupListComponent} from './drug-group-list/drug-group-list.component';


@NgModule({
  declarations: [DrugGroupListComponent],
  imports: [
    CommonModule,
    DrugGroupRoutingModule
  ]
})
export class DrugGroupModule { }
