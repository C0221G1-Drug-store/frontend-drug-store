import {Component, OnInit, ViewChild} from '@angular/core';

import {
  ChartComponent,
  ApexAxisChartSeries,
  ApexChart,
  ApexXAxis,
  ApexDataLabels,
  ApexTooltip,
  ApexStroke,
  ApexTitleSubtitle
} from 'ng-apexcharts';
import {StatisticalChart} from '../../../model/statistical-chart';

export interface ChartOptions {
  series: ApexAxisChartSeries;
  chart: ApexChart;
  xaxis: ApexXAxis;
  stroke: ApexStroke;
  tooltip: ApexTooltip;
  dataLabels: ApexDataLabels;
  title: ApexTitleSubtitle;
}


@Component({
  selector: 'app-statistical-chart',
  templateUrl: './statistical-chart.component.html',
  styleUrls: ['./statistical-chart.component.css']
})
export class StatisticalChartComponent implements OnInit {
  @ViewChild('chart') chart: ChartComponent;
  chartOption?: Partial<ChartOptions>;
  isShowChart = false;
  chartList: StatisticalChart[] = [];
  week: number;
  month: number;
  year: number;
  isWeek: boolean;
  isMonth: boolean;
  isYear: boolean;
  msgDate;
  startDate: string;
  endDate: string;
  weekArray = new Array(52);
  yearArray = new Array(100);


  constructor() {
  }


  ngOnInit(): void {
  }

  showChart() {

    this.chartOption = {
      series: [
        {
          name: 'Doanh thu',
          data: [
            {
              x: '2018-12-29',
              y: 31
            },
            {
              x: '2018-12-30',
              y: 40
            },
            {
              x: '2018-12-31',
              y: 28
            },
            {
              x: '2019-01-01',
              y: 51
            },
          ]
        },
        {
          name: 'Lợi nhuận',
          data: [
            {
              x: '2018-12-29',
              y: 11
            },
            {
              x: '2018-12-30',
              y: 31
            },
            {
              x: '2018-12-31',
              y: 45
            },
            {
              x: '2019-01-01',
              y: 32
            },
          ]
        }
      ],
      chart: {
        height: 350,
        type: 'area'
      },
      dataLabels: {
        enabled: false
      },
      title: {
        text: 'Giá trị(triệu đồng)',
        align: 'left',
        style: {
          fontSize: '14px'
        }
      },
      stroke: {
        curve: 'smooth'
      },
      xaxis: {
        type: 'datetime',
        categories: [
          '2018-12-29',
          '2018-12-30',
          '2018-12-31',
          '2019-01-01',
        ],
      },
      tooltip: {
        x: {
          format: 'dd/MM'
        }
      }
    };
    this.isShowChart = true;
  }


  choiceDate(choice) {
    switch (choice.value) {
      case 'week':
        this.msgDate = '';
        this.isWeek = true;
        this.isMonth = false;
        this.isYear = false;
        break;
      case 'month':
        this.msgDate = '';
        this.isWeek = false;
        this.isMonth = true;
        this.isYear = false;
        break;
      case 'year':
        this.msgDate = '';
        this.isWeek = false;
        this.isMonth = false;
        this.isYear = true;
        break;
    }
  }

  getWeek(week) {
    this.week = week.value;
    this.msgDate = this.getDateOfWeek(this.week, this.year);
  }

  getMonth(month) {
    this.month = month.value;
    this.msgDate = this.getDateOfMonth(month.value);
  }

  getYear(year) {
    this.msgDate = this.getDateOfYear(year.value);
  }

  getYearOfWeek(year) {
    this.year = year.value;
    this.msgDate = this.getDateOfWeek(this.week, this.year);
  }

  // value
  getDateOfMonth(m) {
    const time = new Date(m);
    this.startDate = this.formatDateToDb(time);
    this.endDate = this.formatDateToDb(new Date(time.getFullYear(), time.getMonth() + 1, time.getDate()));
    const startDate = this.formatDateShowClient(time);
    const endDate = this.formatDateShowClient(new Date(time.getFullYear(), time.getMonth() + 1, time.getDate()));
    return 'Từ ' + startDate + ' đến ' + endDate;
  }

  getDateOfWeek(w, y) {
    if (w === undefined || y === undefined) {
      return '';
    } else {
      this.startDate = this.formatDateToDb(new Date(y, 0, (1 + (w - 1) * 7) - 4));
      this.endDate = this.formatDateToDb(new Date(y, 0, (3 + (w - 1) * 7)));
      const startDate = this.formatDateShowClient(new Date(y, 0, (1 + (w - 1) * 7) - 4));
      const endDate = this.formatDateShowClient(new Date(y, 0, (3 + (w - 1) * 7)));
      return 'Từ ' + startDate + ' đến ' + endDate;
    }
  }

  getDateOfYear(y) {
    this.startDate = this.formatDateToDb(new Date(y, 0, 1));
    this.endDate = this.formatDateToDb(new Date(+y + 1, 0, 1));
    const startDate = this.formatDateShowClient(new Date(y, 0, 1));
    const endDate = this.formatDateShowClient(new Date(+y + 1, 0, 1));
    return 'Từ ' + startDate + ' đến ' + endDate;
  }

  formatDateShowClient(date) {
    const d = new Date(date);
    let month = '' + (d.getMonth() + 1);
    let day = '' + d.getDate();
    const year = d.getFullYear();
    if (month.length < 2) {
      month = '0' + month;
    }
    if (day.length < 2) {
      day = '0' + day;
    }
    return [day, month, year].join('-');
  }

  formatDateToDb(date) {
    const d = new Date(date);
    let month = '' + (d.getMonth() + 1);
    let day = '' + d.getDate();
    const year = d.getFullYear();
    if (month.length < 2) {
      month = '0' + month;
    }
    if (day.length < 2) {
      day = '0' + day;
    }
    return [year, month, day].join('-');
  }


}
