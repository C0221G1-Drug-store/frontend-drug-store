import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';



const routes: Routes = [
  {
    path: 'sale-retail',
    loadChildren: () => import('./sale-retail/sale-retail.module').then(module => module.SaleRetailModule)
  },
  {
    path: 'common',
    loadChildren: () => import('./common/common.module').then(module => module.CommonModule)
  },
  {
    path: 'warehouse',
    loadChildren: () => import('./warehouse/warehouse.module').then(module => module.WarehouseModule)
  },
  {
    path: 'management-information',
    loadChildren: () => import('./management-information/management-information.module').then(module => module.ManagementInformationModule)
  },
  {
    path: 'report',
    loadChildren: () => import('./report/report.module').then(module => module.ReportModule)
  },
  {
    path: 'information-lookup',
    loadChildren: () => import('./information-lookup/information-lookup.module').then(module => module.InformationLookupModule)
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ManagementRoutingModule { }
