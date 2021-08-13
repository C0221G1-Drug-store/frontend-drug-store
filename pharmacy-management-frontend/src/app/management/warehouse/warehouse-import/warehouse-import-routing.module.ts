import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {WarehouseImportCreateComponent} from './warehouse-import-create/warehouse-import-create.component';


const routes: Routes = [
  {
    path: 'add',
    component: WarehouseImportCreateComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class WarehouseImportRoutingModule { }
