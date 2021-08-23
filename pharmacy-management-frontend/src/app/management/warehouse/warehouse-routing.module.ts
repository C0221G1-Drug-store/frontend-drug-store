import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';





import {ExportBillPrintComponent} from "./warehouse-export/export-bill-print/export-bill-print.component";
import {ExportBillListComponent} from "./warehouse-export/export-bill-list/export-bill-list.component";


const routes: Routes = [
  {path: 'export-bill/export-bill-refund', component: ExportBillListComponent
  },
  {path: 'export-bill/print', component: ExportBillPrintComponent},


  {
    path: 'warehouse-export',
    loadChildren: () => import('./warehouse-export/warehouse-export.module').then(module => module.WarehouseExportModule)
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class WarehouseRoutingModule { }
