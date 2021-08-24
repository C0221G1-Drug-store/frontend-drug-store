import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {CustomerListComponent} from './customer/customer-list/customer-list.component';
import {CreateCustomerComponent} from './customer/create-customer/create-customer.component';
import {EditCustomerComponent} from './customer/edit-customer/edit-customer.component';


const routes: Routes = [
  {
    path : 'customer', component : CustomerListComponent
  },
  {
    path : 'create', component : CreateCustomerComponent
  },
  {
    path : 'edit', component : EditCustomerComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ManagementInformationRoutingModule { }
