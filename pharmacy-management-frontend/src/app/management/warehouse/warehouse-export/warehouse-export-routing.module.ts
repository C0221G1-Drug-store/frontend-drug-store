import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {ExportBillDestroyComponent} from "./export-bill-destroy/export-bill-destroy.component";
import {ExportBillReturnComponent} from "./export-bill-return/export-bill-return.component";


const routes: Routes = [
  {
    path: 'export-bill-destroy',
    component: ExportBillDestroyComponent
  },
  {
    path: 'export-bill-return',
    component: ExportBillReturnComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class WarehouseExportRoutingModule { }
