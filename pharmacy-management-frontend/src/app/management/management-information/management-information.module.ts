import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {ManagementInformationRoutingModule} from './management-information-routing.module';
import {CustomerListComponent} from './customer/customer-list/customer-list.component';
import {NgbPaginationModule} from '@ng-bootstrap/ng-bootstrap';


@NgModule({
  declarations: [CustomerListComponent],
  exports: [
    CustomerListComponent
  ],
  imports: [
    CommonModule,
    ManagementInformationRoutingModule,
    NgbPaginationModule,

  ]
})
export class ManagementInformationModule {
}
