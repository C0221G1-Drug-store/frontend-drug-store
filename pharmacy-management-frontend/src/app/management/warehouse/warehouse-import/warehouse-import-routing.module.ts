import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {WarehouseImportCreateComponent} from './warehouse-import-create/warehouse-import-create.component';
import {WarehouseImportPaymentComponent} from './warehouse-import-payment/warehouse-import-payment.component';


const routes: Routes = [
  {
    path: 'add',
    component: WarehouseImportCreateComponent
  },
  {
    path: 'payment',
    component: WarehouseImportPaymentComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class WarehouseImportRoutingModule { }
