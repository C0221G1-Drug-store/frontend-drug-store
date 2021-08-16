import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { WholesaleRoutingModule } from './wholesale-routing.module';
import { WholesaleComponent } from './wholesale/wholesale.component';
import { CustomerRefundComponent } from './customer-refund/customer-refund.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';


@NgModule({
  declarations: [WholesaleComponent, CustomerRefundComponent],
    imports: [
        CommonModule,
        WholesaleRoutingModule,
        ReactiveFormsModule,
        FormsModule
    ]
})
export class WholesaleModule { }
