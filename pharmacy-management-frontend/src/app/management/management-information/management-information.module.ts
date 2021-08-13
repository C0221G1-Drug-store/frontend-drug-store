import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ManagementInformationRoutingModule } from './management-information-routing.module';
import { CustomerComponent } from './customer/customer.component';
import { CreateCustomerComponent } from './customer/create-customer/create-customer.component';
import { EditCustomerComponent } from './customer/edit-customer/edit-customer.component';


@NgModule({
  declarations: [CustomerComponent, CreateCustomerComponent, EditCustomerComponent],
  imports: [
    CommonModule,
    ManagementInformationRoutingModule
  ]
})
export class ManagementInformationModule { }
