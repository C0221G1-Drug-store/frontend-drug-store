import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ManagementInformationRoutingModule } from './management-information-routing.module';
import {DrugGroupModule} from './drug-group/drug-group.module';
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import {ToastrModule} from "ngx-toastr";



@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    ManagementInformationRoutingModule,
    DrugGroupModule,

  ]
})
export class ManagementInformationModule { }
