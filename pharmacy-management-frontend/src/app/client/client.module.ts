import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ClientRoutingModule } from './client-routing.module';
import { HomepageComponent } from './homepage/homepage.component';
import { SearchPageComponent } from './search-page/search-page.component';
import { CartComponent } from './cart/cart.component';
import { DrugDetailsComponent } from './drug-details/drug-details.component';
import { LoginRegisterComponent } from './login-register/login-register.component';
import { HeaderFooterClientComponent } from './header-footer-client/header-footer-client.component';


@NgModule({
  declarations: [HomepageComponent, SearchPageComponent, CartComponent, DrugDetailsComponent, LoginRegisterComponent, HeaderFooterClientComponent],
  imports: [
    CommonModule,
    ClientRoutingModule
  ]
})
export class ClientModule { }
