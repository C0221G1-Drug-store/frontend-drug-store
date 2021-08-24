// @ts-ignore
import { BrowserModule } from '@angular/platform-browser';
// @ts-ignore
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import {SaleRetailModule} from './management/sale-retail/sale-retail.module';
import {ManagementModule} from './management/management.module';
import {CommonModule} from './management/common/common.module';
import {MatDialogModule} from '@angular/material/dialog';
// @ts-ignore
import {HttpClientModule} from '@angular/common/http';
import {ManagementInformationModule} from './management/management-information/management-information.module';
import {MatIconModule} from '@angular/material/icon';
import {FontAwesomeModule} from '@fortawesome/angular-fontawesome';

import {ToastrModule} from 'ngx-toastr';
import {NgxPrintModule} from 'ngx-print';

import {ManufacturerModule} from "./management/manufacturer/manufacturer.module";


@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    SaleRetailModule,
    BrowserAnimationsModule,
    ManagementModule,
    CommonModule,
    MatDialogModule,
    HttpClientModule,
    ManagementInformationModule,
    MatIconModule,
    FontAwesomeModule,
    ToastrModule.forRoot(),
    NgxPrintModule,
    ManufacturerModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
}
