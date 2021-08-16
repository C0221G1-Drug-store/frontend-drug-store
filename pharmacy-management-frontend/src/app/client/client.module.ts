import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {ClientRoutingModule} from './client-routing.module';
import {HomepageComponent} from './homepage/homepage.component';
import {SearchPageComponent} from './search-page/search-page.component';
import {CartComponent} from './cart/cart.component';
import {DrugDetailsComponent} from './drug-details/drug-details.component';
import {LoginRegisterComponent} from './login-register/login-register.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {HeaderClientComponent} from './header-client/header-client.component';
import {FooterClientComponent} from './footer-client/footer-client.component';


@NgModule({
  declarations: [
    HomepageComponent, SearchPageComponent, CartComponent, DrugDetailsComponent,
    LoginRegisterComponent, HeaderClientComponent, FooterClientComponent
  ],
  exports: [
    HeaderClientComponent,
    FooterClientComponent
  ],
  imports: [
    CommonModule,
    ClientRoutingModule,
    ReactiveFormsModule,
    FormsModule
  ]
})
export class ClientModule {
}
