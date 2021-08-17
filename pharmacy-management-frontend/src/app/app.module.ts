import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import {SaleRetailModule} from './management/sale-retail/sale-retail.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {ManagementModule} from './management/management.module';
import {CommonModule} from './management/common/common.module';
import {MatDialogModule} from '@angular/material/dialog/dialog-module';
import {HttpClientModule} from '@angular/common/http';
import {WarehouseExportModule} from './management/warehouse/warehouse-export/warehouse-export.module';

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
        WarehouseExportModule
    ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
