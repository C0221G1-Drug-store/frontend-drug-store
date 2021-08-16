import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DrugRoutingModule } from './drug-routing.module';
import { DrugCreateComponent } from './drug-create/drug-create.component';
import { DrugEditComponent } from './drug-edit/drug-edit.component';
import { DrugListComponent } from './drug-list/drug-list.component';
import {ReactiveFormsModule} from '@angular/forms';



@NgModule({
  declarations: [DrugCreateComponent, DrugEditComponent, DrugListComponent],
    imports: [
        CommonModule,
        DrugRoutingModule,
        ReactiveFormsModule
    ]
})
export class DrugModule { }
