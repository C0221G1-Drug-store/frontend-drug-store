import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ManagementInformationRoutingModule } from './management-information-routing.module';
import {DrugGroupModule} from './drug-group/drug-group.module';
import { DrugGroupDeleteComponent } from './drug-group/drug-group-delete/drug-group-delete.component';



@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    ManagementInformationRoutingModule,
    DrugGroupModule
  ]
})
export class ManagementInformationModule { }
