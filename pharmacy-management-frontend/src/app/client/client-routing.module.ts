import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CartComponent } from './cart/cart.component';
import { DrugDetailsComponent } from './drug-details/drug-details.component';
import { HomepageComponent } from './homepage/homepage.component';
import { LoginRegisterComponent } from './login-register/login-register.component';
import { SearchPageComponent } from './search-page/search-page.component';
import {GroupComponent} from './group/group.component';


const routes: Routes = [
  {path: '', component: HomepageComponent},
  {path: 'search/:search', component: SearchPageComponent},
  {path: 'details/:id', component: DrugDetailsComponent},
  {path: 'cart', component: CartComponent},
  {path: 'login', component: LoginRegisterComponent},
  {path: 'group/:id', component: GroupComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ClientRoutingModule { }
