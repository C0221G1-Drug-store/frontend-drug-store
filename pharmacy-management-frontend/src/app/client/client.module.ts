import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ClientRoutingModule } from './client-routing.module';
import { HomepageComponent } from './homepage/homepage.component';
import { SearchPageComponent } from './search-page/search-page.component';
import { CartComponent } from './cart/cart.component';
import { DrugDetailsComponent } from './drug-details/drug-details.component';
import { LoginRegisterComponent } from './login-register/login-register.component';
<<<<<<< HEAD
import { HeaderFooterClientComponent } from './header-footer-client/header-footer-client.component';
import {ReactiveFormsModule} from '@angular/forms';
=======
import { HeaderClientComponent } from './header-client/header-client.component';
import { FooterClientComponent } from './footer-client/footer-client.component';
>>>>>>> bc98acdbd7094dc9546bd735d9ebe172df5a3545


@NgModule({
  declarations: [HomepageComponent, SearchPageComponent, CartComponent, DrugDetailsComponent, LoginRegisterComponent, HeaderClientComponent, FooterClientComponent],
  imports: [
<<<<<<< HEAD
    CommonModule,
    ClientRoutingModule,
    ReactiveFormsModule
=======
    ClientRoutingModule
>>>>>>> bc98acdbd7094dc9546bd735d9ebe172df5a3545
  ]
})
export class ClientModule { }
