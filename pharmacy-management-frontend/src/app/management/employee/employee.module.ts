import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {EmployeeRoutingModule} from './employee-routing.module';
import {ListEmployeeComponent} from './list-employee/list-employee.component';
import {ReactiveFormsModule} from '@angular/forms';
import {EmployeeCreateComponent} from './employee-create/employee-create.component';
import {AngularFireModule} from '@angular/fire';
import {environment} from '../../../environments/environment';


@NgModule({
  declarations: [ListEmployeeComponent, EmployeeCreateComponent],
  imports: [
    CommonModule,
    EmployeeRoutingModule,
    ReactiveFormsModule,
    AngularFireModule.initializeApp(environment.firebaseConfig)
  ]
})
export class EmployeeModule {
}

