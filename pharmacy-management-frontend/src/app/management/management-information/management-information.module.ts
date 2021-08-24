import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {ManagementInformationRoutingModule} from './management-information-routing.module';
import {CustomerListComponent} from './customer/customer-list/customer-list.component';
import {NgbPaginationModule} from '@ng-bootstrap/ng-bootstrap';
import {NgxPaginationModule} from 'ngx-pagination';

import { CreateCustomerComponent } from './customer/create-customer/create-customer.component';
import { EditCustomerComponent } from './customer/edit-customer/edit-customer.component';
import {ReactiveFormsModule} from '@angular/forms';


@NgModule({
  declarations: [ CreateCustomerComponent, EditCustomerComponent, CustomerListComponent],
  imports: [
    CommonModule,
    ManagementInformationRoutingModule,
    NgxPaginationModule,
    NgbPaginationModule,
    ReactiveFormsModule,
  ]
})
export class ManagementInformationModule {
}
