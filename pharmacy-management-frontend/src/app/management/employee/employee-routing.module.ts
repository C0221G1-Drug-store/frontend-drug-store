import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
<<<<<<< HEAD
import {EmployeeListComponent} from './employee-list/employee-list.component';


const routes: Routes = [
  {path: '' , component : EmployeeListComponent}
];

// @ts-ignore
=======
import {ListEmployeeComponent} from './list-employee/list-employee.component';


const routes: Routes = [
  {path: '', component: ListEmployeeComponent}
];

>>>>>>> employee
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class EmployeeRoutingModule { }
