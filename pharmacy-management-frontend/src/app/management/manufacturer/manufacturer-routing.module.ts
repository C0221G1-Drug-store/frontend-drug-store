import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {ManufacturerListComponent} from "./manufacturer-list/manufacturer-list.component";
import {ManufacturerCreateComponent} from "./manufacturer-create/manufacturer-create.component";
const routes: Routes = [
  {path:"list", component: ManufacturerListComponent},
  {path:"create", component: ManufacturerCreateComponent},
  ];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ManufacturerRoutingModule { }
