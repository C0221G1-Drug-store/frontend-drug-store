import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ManagementInformationRoutingModule } from './management-information-routing.module';

import { CreateCustomerComponent } from './customer/create-customer/create-customer.component';
import { EditCustomerComponent } from './customer/edit-customer/edit-customer.component';
import {ReactiveFormsModule} from '@angular/forms';


@NgModule({
  declarations: [ CreateCustomerComponent, EditCustomerComponent],
  imports: [
    CommonModule,
    ManagementInformationRoutingModule,
    ReactiveFormsModule
  ]
})
export class ManagementInformationModule { }
