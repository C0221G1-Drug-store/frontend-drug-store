import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {ExportBillRefundComponent} from './export-bill-refund/export-bill-refund.component';


const routes: Routes = [
  {path: 'export-bill-refund' , component: ExportBillRefundComponent},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class WarehouseExportRoutingModule { }
