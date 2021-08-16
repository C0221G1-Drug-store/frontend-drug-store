import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {EmployeeRoutingModule} from './employee-routing.module';
import {ListEmployeeComponent} from './list-employee/list-employee.component';
import {ReactiveFormsModule} from '@angular/forms';
import {EmployeeCreateComponent} from './employee-create/employee-create.component';
import { EmployeeUpdateComponent } from './employee-update/employee-update.component';


@NgModule({
  declarations: [ListEmployeeComponent, EmployeeCreateComponent, EmployeeUpdateComponent],
  imports: [
    CommonModule,
    EmployeeRoutingModule,
    ReactiveFormsModule
  ]
})
export class EmployeeModule {
}
