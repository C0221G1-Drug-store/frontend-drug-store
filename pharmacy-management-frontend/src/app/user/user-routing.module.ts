import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {LoginRegisterComponent} from "./user-component/login-register/login-register.component";


const routes: Routes = [{
  path: 'login',
  component: LoginRegisterComponent
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UserRoutingModule { }
