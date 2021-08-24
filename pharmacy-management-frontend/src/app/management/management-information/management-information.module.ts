import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ManagementInformationRoutingModule } from './management-information-routing.module';
import {DrugGroupModule} from './drug-group/drug-group.module';
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import {ToastrModule} from "ngx-toastr";
import {CustomerListComponent} from "./customer/customer-list/customer-list.component";



@NgModule({
  declarations: [CustomerListComponent],
  imports: [
    CommonModule,
    ManagementInformationRoutingModule,
    DrugGroupModule,
  ]
})
export class ManagementInformationModule { }
