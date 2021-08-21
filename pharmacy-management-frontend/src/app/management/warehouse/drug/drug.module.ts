import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DrugRoutingModule } from './drug-routing.module';
import { DrugCreateComponent } from './drug-create/drug-create.component';
import { DrugEditComponent } from './drug-edit/drug-edit.component';
import { DrugListComponent } from './drug-list/drug-list.component';

import {FormGroup, FormsModule, ReactiveFormsModule} from '@angular/forms';
import { DrugDeleteComponent } from './drug-delete/drug-delete.component';
import { DrugNotSelectedComponent } from './drug-not-selected/drug-not-selected.component';





@NgModule({

  declarations: [DrugCreateComponent, DrugEditComponent, DrugListComponent, DrugDeleteComponent, DrugNotSelectedComponent],
  imports: [
    CommonModule,
    DrugRoutingModule,
    FormsModule,
    ReactiveFormsModule
  ]

})
export class DrugModule { }
