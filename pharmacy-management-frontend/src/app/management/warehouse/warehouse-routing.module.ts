import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';


const routes: Routes = [
  {
    path: 'import',
    loadChildren: () => import('./warehouse-import/warehouse-import.module').then(module => module.WarehouseImportModule)
  },{
    path: 'drug',
    loadChildren: () => import('./drug/drug.module').then(module => module.DrugModule)
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class WarehouseRoutingModule { }
