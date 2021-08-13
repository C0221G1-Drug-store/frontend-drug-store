import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import {SaleRetailModule} from './management/sale-retail/sale-retail.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {ManagementModule} from './management/management.module';
import {CommonModule} from './management/common/common.module';
import {MatDialogModule} from '@angular/material/dialog';
import {HttpClientModule} from '@angular/common/http';

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
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
