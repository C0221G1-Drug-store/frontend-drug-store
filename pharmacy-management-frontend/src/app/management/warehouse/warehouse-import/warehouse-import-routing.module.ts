import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';

import {WarehouseImportDrugListComponent} from './warehouse-import-drug-list/warehouse-import-drug-list.component';


const routes: Routes = [
  {
    path: 'list', component: WarehouseImportDrugListComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class WarehouseImportRoutingModule {
}
