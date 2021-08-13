import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { WholesaleRoutingModule } from './wholesale-routing.module';
import { WholesaleComponent } from './wholesale/wholesale.component';
import { CustomerRefundComponent } from './customer-refund/customer-refund.component';


@NgModule({
  declarations: [WholesaleComponent, CustomerRefundComponent],
  imports: [
    CommonModule,
    WholesaleRoutingModule
  ]
})
export class WholesaleModule { }
