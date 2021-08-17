import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PrescriptionRoutingModule } from './prescription-routing.module';
import {PrescriptionListComponent} from './prescription-list/prescription-list.component';
import {PrescriptionCreateComponent} from './prescription-create/prescription-create.component';
import { PrescriptionEditComponent } from './prescription-edit/prescription-edit.component';

import { PrescriptionDeleteComponent } from './prescription-delete/prescription-delete.component';
import {IndicativeModule} from '../indicative/indicative.module';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';


@NgModule({
  declarations: [
    PrescriptionListComponent,
    PrescriptionCreateComponent,
    PrescriptionEditComponent,
    PrescriptionDeleteComponent
  ],
  imports: [
    CommonModule,
    PrescriptionRoutingModule,

    IndicativeModule,
    ReactiveFormsModule,
    FormsModule
  ]
})
export class PrescriptionModule { }
