import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {CustomerListComponent} from './customer/customer-list/customer-list.component';


const routes: Routes = [
  {
    path : 'customer', component : CustomerListComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ManagementInformationRoutingModule { }
