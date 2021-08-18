import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { EmployeeRoutingModule } from './employee-routing.module';
import { ListEmployeeComponent } from './list-employee/list-employee.component';
import { EmployeeDeleteComponent } from './employee-delete/employee-delete.component';
import {FormsModule} from "@angular/forms";


@NgModule({
  declarations: [ListEmployeeComponent, EmployeeDeleteComponent],
  imports: [
    CommonModule,
    EmployeeRoutingModule,
    FormsModule
  ]
})
export class EmployeeModule { }
