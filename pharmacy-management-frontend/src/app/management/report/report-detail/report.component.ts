import {Component, OnInit} from '@angular/core';
import {ReportService} from '../../../service/report.service';



@Component({
  selector: 'app-report',
  templateUrl: './report.component.html',
  styleUrls: ['./report.component.css']
})
export class ReportComponent implements OnInit {
  choice = '';
  sDate = '';
  eDate = '';
  sTime = '';
  eTime = '';
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
    if ((this.sDate === '' || this.eDate === '' || this.sTime === '' || this.eTime === '') && this.displayDate) {
      this.msgDate = 'Vui lòng chọn ngày giờ';
      return;
    }
    if ((Date.parse(this.sDate) > Date.parse(this.eDate) && this.displayDate)) {
      this.msgDate = 'Vui lòng chọn ngày bắt đầu trước ngày kết thúc';
      return;
    }
    if (this.choice === '') {
      this.msgChoice = 'Vui lòng chọn loại báo cáo';
      return;
    }
    const startDate = this.sDate + 'T' + this.sTime;
    const endDate = this.eDate + 'T' + this.eTime;
    this.sv.importDetails(this.choice, startDate, endDate).subscribe(r => {
      if (r == null) {
        this.msgChoice = 'Không tìm thấy dữ liệu (null)';
        return;
      }

      this.sv.exportExcel(r, this.choice);
      this.msgDate = '';
    }, e => {
      this.msgChoice = 'Không tìm thấy dữ liệu (error)';
    });
  }


  subDate(dateTime: string) {
    const v = dateTime.substr(0, 10);
    console.log(v);
    return v;
  }

  subTime(dateTime: string) {
    const v = dateTime.substr(11, 16);
    console.log(v);
    return v;
  }
}
