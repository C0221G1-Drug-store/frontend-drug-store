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
export class ChartOptions {
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
  turnovers: StatisticalChart[] =
    [
      {doanhThu: 1000, ngayDoanhThu: '2021-08-01'},
      {doanhThu: 1200, ngayDoanhThu: '2021-08-02'},
      {doanhThu: 1300, ngayDoanhThu: '2021-08-03'},
      {doanhThu: 1400, ngayDoanhThu: '2021-08-04'},
      {doanhThu: 1500, ngayDoanhThu: '2021-08-05'},
      {doanhThu: 1600, ngayDoanhThu: '2021-08-06'},
      {doanhThu: 1700, ngayDoanhThu: '2021-08-07'},
      {doanhThu: 1800, ngayDoanhThu: '2021-08-08'},
      {doanhThu: 1900, ngayDoanhThu: '2021-08-09'},
      {doanhThu: 2000, ngayDoanhThu: '2021-08-10'},
    ];
  profits: StatisticalChart[] =
    [
      {loiNhuan: 300, ngayLoiNhuan: '2021-08-01'},
      {loiNhuan: 400, ngayLoiNhuan: '2021-08-02'},
      {loiNhuan: 500, ngayLoiNhuan: '2021-08-03'},
      {loiNhuan: 600, ngayLoiNhuan: '2021-08-04'},
      {loiNhuan: 700, ngayLoiNhuan: '2021-08-05'},
      {loiNhuan: 800, ngayLoiNhuan: '2021-08-06'},
      {loiNhuan: 900, ngayLoiNhuan: '2021-08-07'},
      {loiNhuan: 1000, ngayLoiNhuan: '2021-08-08'},
      {loiNhuan: 1100, ngayLoiNhuan: '2021-08-09'},
      {loiNhuan: 1200, ngayLoiNhuan: '2021-08-10'},
    ];
  week: number;
  month: number;
  year: number;
  isWeek = false;
  isMonth = false;
  isYear = false;
  msgDate;
  startDate = '';
  endDate = '';
  weekArray = new Array(52);
  yearArray = new Array(100);
  turnover: number;
  profit: number;
  averageTurnover: number;
  averageProfit: number;
  isSuccess = false;

  constructor() {
  }


  ngOnInit(): void {
  }

  showChart() {
    if (this.isWeek === false && this.isMonth === false && this.isYear === false) {
      this.msgDate = 'Vui lòng chọn theo tuần/tháng/năm';
      this.isShowChart = false;
      return;
    }
    if (this.turnovers === null && this.profits === null) {
      this.isShowChart = false;
      return;
    }
    if (this.startDate === '' || this.endDate === '') {
      this.msgDate = 'Vui lòng chọn thời gian muốn hiển thị';
      this.isShowChart = false;
      return;
    }
    this.paintChart();
    if (this.isWeek === true || this.isMonth === true) {
      this.week = undefined;
      this.month = undefined;
      this.year = undefined;
      this.showChartByWeekMonth();
      this.isShowChart = true;
      this.msgDate = '';
      return;
    }
    if (this.isYear === true) {
      this.week = undefined;
      this.month = undefined;
      this.year = undefined;
      this.isShowChart = true;
      this.msgDate = '';
      return;
    }
    this.week = undefined;
    this.month = undefined;
    this.year = undefined;
    this.msgDate = '';
    this.isShowChart = false;
  }

  showChartByWeekMonth() {
    // tslint:disable-next-line:prefer-for-of
    for (let i = 0; i < this.turnovers.length; i++) {
      // @ts-ignore
      this.chartOption.series[0].data.push({x: this.turnovers[i].ngayDoanhThu, y: this.turnovers[i].doanhThu});
      this.chartOption.xaxis.categories = this.turnovers[i].ngayDoanhThu;
      this.turnover += this.turnovers[i].doanhThu;
      this.msgDate = '';
      this.averageProfit = this.profit / this.profits.length;
    }
    this.averageTurnover = this.turnover / this.turnovers.length;
    // tslint:disable-next-line:prefer-for-of
    for (let i = 0; i < this.profits.length; i++) {
      // @ts-ignore
      this.chartOption.series[1].data.push({x: this.profits[i].ngayLoiNhuan, y: this.profits[i].loiNhuan});
      this.profit += this.profits[i].loiNhuan;
    }
  }


  paintChart() {
    this.chartOption = {
      series: [
        {
          name: 'Doanh thu',
          data: []
        },
        {
          name: 'Lợi nhuận',
          data: []
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
        categories: [],
      },
      tooltip: {
        x: {
          format: 'dd/MM'
        }
      }
    };
  }

  choiceDate(choice) {
    this.month = undefined;
    this.year = undefined;
    this.week = undefined;
    this.isShowChart = false;
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
    this.isSuccess = true;
    this.msgDate = this.getDateOfWeek(this.week, this.year);
  }

  getMonth(month) {
    this.month = month.value;
    this.isSuccess = true;
    this.msgDate = this.getDateOfMonth(month.value);
  }

  getYear(year) {
    this.isSuccess = true;
    this.msgDate = this.getDateOfYear(year.value);
  }

  getYearOfWeek(year) {
    this.year = year.value;
    this.isSuccess = true;
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
    }
    this.startDate = this.formatDateToDb(new Date(y, 0, (1 + (w - 1) * 7) - 4));
    this.endDate = this.formatDateToDb(new Date(y, 0, (3 + (w - 1) * 7)));
    const startDate = this.formatDateShowClient(new Date(y, 0, (1 + (w - 1) * 7) - 4));
    const endDate = this.formatDateShowClient(new Date(y, 0, (3 + (w - 1) * 7)));
    return 'Từ ' + startDate + ' đến ' + endDate;
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
