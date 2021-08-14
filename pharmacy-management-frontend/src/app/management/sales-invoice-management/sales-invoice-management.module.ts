import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SalesInvoiceManagementRoutingModule } from './sales-invoice-management-routing.module';
import { SalesInvoiceComponent } from './sales-invoice/sales-invoice.component';


@NgModule({
  declarations: [SalesInvoiceComponent],
  imports: [
    CommonModule,
    SalesInvoiceManagementRoutingModule
  ]
})
export class SalesInvoiceManagementModule { }
