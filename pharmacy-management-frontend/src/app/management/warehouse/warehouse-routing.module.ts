import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {WarehouseImportCreateComponent} from './warehouse-import/warehouse-import-create/warehouse-import-create.component';


const routes: Routes = [
  {
    path: 'import',
    loadChildren: () => import('./warehouse-import/warehouse-import.module').then(module => module.WarehouseImportModule)
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class WarehouseRoutingModule { }
