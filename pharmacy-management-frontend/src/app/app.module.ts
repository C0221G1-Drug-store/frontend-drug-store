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
<<<<<<< HEAD
import {WarehouseExportModule} from './management/warehouse/warehouse-export/warehouse-export.module';
=======
>>>>>>> 42fa1997646221384241896f84cc8ddcb05542d0

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
<<<<<<< HEAD
    HttpClientModule,
    WarehouseExportModule
=======
    HttpClientModule
>>>>>>> 42fa1997646221384241896f84cc8ddcb05542d0
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
