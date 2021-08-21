import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {ExportBillRefundComponent} from './export-bill-refund/export-bill-refund.component';
import {HomeComponent} from '../../common/home/home.component';
import {ExportBillListComponent} from './export-bill-list/export-bill-list.component';


const routes: Routes = [
  {path: 'export-bill-refund' , component: ExportBillRefundComponent},
  {path: 'export-bill-management' , component: ExportBillListComponent},
  {path: '' , component: HomeComponent},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class WarehouseExportRoutingModule { }
