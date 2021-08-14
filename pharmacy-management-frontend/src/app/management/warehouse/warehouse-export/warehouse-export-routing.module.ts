import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
<<<<<<< HEAD
import {ExportBillRefundComponent} from './export-bill-refund/export-bill-refund.component';


const routes: Routes = [
  {path: 'export-bill-refund' , component: ExportBillRefundComponent},
=======
import {ExportBillDestroyComponent} from "./export-bill-destroy/export-bill-destroy.component";


const routes: Routes = [
  {
    path: 'export-bill-destroy',
    component: ExportBillDestroyComponent
  }
>>>>>>> 42fa1997646221384241896f84cc8ddcb05542d0
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class WarehouseExportRoutingModule { }
