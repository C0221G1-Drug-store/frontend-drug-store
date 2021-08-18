import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import {SaleRetailModule} from './management/sale-retail/sale-retail.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {ManagementModule} from './management/management.module';
import {CommonModule} from './management/common/common.module';
import {MatDialog, MatDialogModule} from '@angular/material/dialog';
import {HttpClientModule} from '@angular/common/http';
import {WarehouseExportModule} from './management/warehouse/warehouse-export/warehouse-export.module';
import {MatSelectModule} from '@angular/material/select';
import {NgxPrintModule} from 'ngx-print';
import {MDBBootstrapModule} from 'angular-bootstrap-md';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {NgxPaginationModule} from 'ngx-pagination';
import {MatIconModule} from '@angular/material/icon';
import {MatButtonModule} from '@angular/material/button';
import {Overlay} from '@angular/cdk/overlay';

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
    WarehouseExportModule,
    MatSelectModule,
    NgxPrintModule,
    MatSelectModule,
    FormsModule,
    NgxPaginationModule,
    ReactiveFormsModule,
    NgxPrintModule,
    MatIconModule,
    MatDialogModule,
    MatButtonModule


  ],
  providers: [MatDialog ,Overlay],
  bootstrap: [AppComponent]
})
export class AppModule { }
