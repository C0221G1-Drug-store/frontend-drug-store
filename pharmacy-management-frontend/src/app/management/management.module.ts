import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ManagementRoutingModule } from './management-routing.module';
import {ReactiveFormsModule} from '@angular/forms';
@NgModule({
  declarations: [],
  exports: [
  ],

    imports: [
        CommonModule,
        ManagementRoutingModule,
        ReactiveFormsModule
    ]
})
export class ManagementModule { }
