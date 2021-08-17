import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {ExportBillPrintComponent} from "./warehouse-export/export-bill-print/export-bill-print.component";


const routes: Routes = [
  // {path: 'export-bill/import', component: ExportBillImportComponent
  // },
  {path: 'export-bill/print', component: ExportBillPrintComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class WarehouseRoutingModule { }
