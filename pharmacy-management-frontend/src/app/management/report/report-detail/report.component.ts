import {Component, OnInit} from '@angular/core';
import {ReportService} from '../../../service/report.service';
import {Report} from '../../../model/report';


@Component({
  selector: 'app-report',
  templateUrl: './report.component.html',
  styleUrls: ['./report.component.css']
})
export class ReportComponent implements OnInit {
  reports: Report[] = [];
  choice: string = '';
  sDate: string = '';
  eDate: string = '';
  sTime: string = '';
  eTime: string = '';
  msgChoice: string;
  msgDate: string;
  displayDate = true;

  constructor(private sv: ReportService) {
  }

  ngOnInit(): void {
  }

  showDate() {
    this.displayDate = true;
  }

  hiddenDate() {
    this.displayDate = false;
  }

  exportExcelHaveDate() {
    if (this.sDate == '' || this.eDate == '' || this.sTime == '' || this.eTime == '') {
      this.msgDate = 'Vui lòng chọn ngày giờ';
      return;
    }
    if (Date.parse(this.sDate) > Date.parse(this.eDate)) {
      this.msgDate = 'Vui lòng chọn ngày bắt đầu trước ngày kết thúc';
      return;
    }
    if (this.choice == '') {
      this.msgChoice = 'Vui lòng chọn loại báo cáo';
      return;
    }
    let startDate = this.sDate + 'T' + this.sTime;
    let endDate = this.eDate + 'T' + this.eTime;
    this.sv.importDetails(this.choice, startDate, endDate).subscribe(r => {
      this.reports = r;
      this.sv.exportExcel(this.reports, this.choice);
      this.msgDate = '';
    }, e=>{
      this.msgChoice='Không tìm thấy dữ liệu';
    });
  }

  exportExcelNoDate() {
    if (this.choice == '') {
      this.msgChoice = 'Vui lòng chọn loại báo cáo';
      return;
    }
  }


  subDate(dateTime: string) {
    let v = dateTime.substr(0, 10);
    console.log(v);
    return v;
  }

  subTime(dateTime: string) {
    let v = dateTime.substr(11, 16);
    console.log(v);
    return v;
  }
}
