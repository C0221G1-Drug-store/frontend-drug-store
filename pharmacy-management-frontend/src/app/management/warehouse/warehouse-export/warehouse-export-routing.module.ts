import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {ExportBillRefundComponent} from './export-bill-refund/export-bill-refund.component';
import {HomeComponent} from '../../common/home/home.component';
<<<<<<< HEAD
=======
import {ExportBillListComponent} from './export-bill-list/export-bill-list.component';
>>>>>>> management-export-bill


const routes: Routes = [
  {path: 'export-bill-refund' , component: ExportBillRefundComponent},
<<<<<<< HEAD
=======
  {path: 'export-bill-management' , component: ExportBillListComponent},
>>>>>>> management-export-bill
  {path: '' , component: HomeComponent},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class WarehouseExportRoutingModule { }
