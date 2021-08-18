import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { EmployeeRoutingModule } from './employee-routing.module';
<<<<<<< HEAD
import { EmployeeListComponent } from './employee-list/employee-list.component';
import {FormsModule} from '@angular/forms';
import { EmployeeDeleteComponent } from './employee-delete/employee-delete.component';


// @ts-ignore
// @ts-ignore
// @ts-ignore
@NgModule({
  declarations: [EmployeeListComponent, EmployeeDeleteComponent],
  imports: [
    CommonModule,
    EmployeeRoutingModule,
    FormsModule
=======
import { ListEmployeeComponent } from './list-employee/list-employee.component';


@NgModule({
  declarations: [ListEmployeeComponent],
  imports: [
    CommonModule,
    EmployeeRoutingModule
>>>>>>> employee
  ]
})
export class EmployeeModule { }
