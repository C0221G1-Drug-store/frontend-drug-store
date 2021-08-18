import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { EmployeeRoutingModule } from './employee-routing.module';
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
  ]
})
export class EmployeeModule { }
