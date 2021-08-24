import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
// import {ExportBillRefundComponent} from './export-bill-management/export-bill-refund/export-bill-refund.component';


const routes: Routes = [
  {
    path: 'drugGroup',
    loadChildren: () => import('./drug-group/drug-group-routing.module').then(module => module.DrugGroupRoutingModule)
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ManagementInformationRoutingModule { }
