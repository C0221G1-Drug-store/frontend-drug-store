import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DrugRoutingModule } from './drug-routing.module';
import { DrugCreateComponent } from './drug-create/drug-create.component';
import { DrugEditComponent } from './drug-edit/drug-edit.component';


@NgModule({
  declarations: [DrugCreateComponent, DrugEditComponent],
  imports: [
    CommonModule,
    DrugRoutingModule
  ]
})
export class DrugModule { }
