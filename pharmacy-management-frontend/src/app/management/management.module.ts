import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ManagementRoutingModule } from './management-routing.module';
import { ManufacturerCreateComponent } from './manufacturer/manufacturer-create/manufacturer-create.component';
import {ReactiveFormsModule} from '@angular/forms';

@NgModule({
  declarations: [ManufacturerCreateComponent],
  exports: [
  ],
    imports: [
        CommonModule,
        ManagementRoutingModule,
        ReactiveFormsModule
    ]
})
export class ManagementModule { }
