import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {ExportBillDestroyComponent} from "./export-bill-destroy/export-bill-destroy.component";


const routes: Routes = [
  {
    path: 'export-bill-destroy',
    component: ExportBillDestroyComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class WarehouseExportRoutingModule { }
