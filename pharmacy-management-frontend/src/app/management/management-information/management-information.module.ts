import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ManagementInformationRoutingModule } from './management-information-routing.module';
import { CustomerListComponent } from './customer/customer-list/customer-list.component';


@NgModule({
  declarations: [CustomerListComponent],
  imports: [
    CommonModule,
    ManagementInformationRoutingModule
  ]
})
export class ManagementInformationModule { }
