import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ManufacturerRoutingModule } from './manufacturer-routing.module';
import { ManufacturerListComponent } from './manufacturer-list/manufacturer-list.component';
import { ManufacturerUpdateComponent } from './manufacturer-update/manufacturer-update.component';



@NgModule({
  declarations: [ManufacturerListComponent, ManufacturerUpdateComponent],
  imports: [
    CommonModule,
    ManufacturerRoutingModule,
  ]
})
export class ManufacturerModule { }
