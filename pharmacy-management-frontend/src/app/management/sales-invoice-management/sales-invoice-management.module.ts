import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SalesInvoiceManagementRoutingModule } from './sales-invoice-management-routing.module';
import { SalesInvoiceComponent } from './sales-invoice/sales-invoice.component';
import { SalesInvoiceDeleteComponent } from './sales-invoice-delete/sales-invoice-delete.component';
import { SalesInvoiceDetailComponent } from './sales-invoice-detail/sales-invoice-detail.component';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {MatDialogModule} from "@angular/material/dialog";
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import {HttpClientModule} from "@angular/common/http";



@NgModule({
  declarations: [SalesInvoiceComponent, SalesInvoiceDeleteComponent, SalesInvoiceDetailComponent],
  imports: [
    CommonModule,
    SalesInvoiceManagementRoutingModule,
    FormsModule,
    MatDialogModule,
    BrowserAnimationsModule,
    ReactiveFormsModule,
    HttpClientModule,



  ]
})
export class SalesInvoiceManagementModule { }
