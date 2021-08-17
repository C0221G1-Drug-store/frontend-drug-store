import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {ManagementInformationRoutingModule} from './management-information-routing.module';
import {CustomerListComponent} from './customer/customer-list/customer-list.component';
import {NgbPaginationModule} from '@ng-bootstrap/ng-bootstrap';
import {NgxPaginationModule} from 'ngx-pagination';
import {FormsModule} from '@angular/forms';


@NgModule({
  declarations: [CustomerListComponent],
  exports: [
    CustomerListComponent
  ],
  imports: [
    CommonModule,
    ManagementInformationRoutingModule,
    NgxPaginationModule,
    NgbPaginationModule,
    FormsModule,

  ]
})
export class ManagementInformationModule {
}
