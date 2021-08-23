import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SaleRetailRoutingModule } from './sale-retail-routing.module';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import { SaleComponent } from './sale/sale.component';
import { PrescriptionComponent } from './prescription/prescription.component';
import { PrescriptionDetailComponent } from './prescription-detail/prescription-detail.component';



@NgModule({
  declarations: [ SaleComponent, PrescriptionComponent, PrescriptionDetailComponent],
  exports: [
  ],
  imports: [
    CommonModule,
    SaleRetailRoutingModule,
    FormsModule,
    ReactiveFormsModule
  ]
})
export class SaleRetailModule { }
