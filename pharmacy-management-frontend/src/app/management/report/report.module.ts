import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {ReportRoutingModule} from './report-routing.module';
import {ReportComponent} from './report-detail/report.component';
import {FormsModule} from '@angular/forms';
import {StatisticalChartComponent} from './statistical-chart/statistical-chart.component';
import {NgApexchartsModule} from 'ng-apexcharts';
import {MatTabsModule} from '@angular/material/tabs';

@NgModule({
  declarations: [ReportComponent, StatisticalChartComponent],
    imports: [
        CommonModule,
        ReportRoutingModule,
        FormsModule,
        NgApexchartsModule,
        MatTabsModule
    ]
})
export class ReportModule {
}
