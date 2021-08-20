import {Component, OnInit} from '@angular/core';
import {ImportBill} from '../model/import-bill';
import {ImportBillServiceService} from '../service/import-bill-service.service';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {MatDialog} from '@angular/material/dialog';
import {WarehouseImportDerugDeleteComponent} from '../warehouse-import-derug-delete/warehouse-import-derug-delete.component';
import {IImportBillDto} from '../model/iimport-bill-dto';

@Component({
  selector: 'app-warehouse-import-drug-list',
  templateUrl: './warehouse-import-drug-list.component.html',
  styleUrls: ['./warehouse-import-drug-list.component.css']
})
export class WarehouseImportDrugListComponent implements OnInit {
  flag = false;
  bills: IImportBillDto[] = [];
  page: number = 0;
  pages: Array<number>;
  totalPage = 0;
  invoiceDate = 'invoiceDate';
  message = '';
  startDateTime = '';
  endDateTime = '';
  startDate = '1000-01-01 ';
  endDate = '9999-09-09 ';
  startTime = '';
  endTime = '';
  newDate = new Date();
  nowDate = this.newDate.getFullYear().toString() + '-' + this.newDate.getMonth().toString() + '-' + this.newDate.getDate().toString();
  nowTime = this.newDate.getHours().toString() + this.newDate.getMinutes().toString() + this.newDate.getMilliseconds().toString();
  public searchBill: FormGroup;
  idDialog: any;
  nameDialog: any;
  selectedImportbill: ImportBill;
  validate_message = {
    date: [
      {type: 'pattern', message: '* ex:dd-mm-yyyy'}
    ], time: [
      {type: 'pattern', message: '* ex:hh:mm:ss'}
    ],

  };

  constructor(private importBillServiceService: ImportBillServiceService,
              private dialog: MatDialog) {
  }

  ngOnInit(): void {
    this.getListBill(this.page);

    this.searchBill = new FormGroup({
      billCode: new FormControl(''),
      startDate: new FormControl('', [Validators.pattern('^\\d{4}\\-\\d{2}\\-\\d{2}$')]),
      endDate: new FormControl('', [Validators.pattern('^\\d{4}\\-\\d{2}\\-\\d{2}$')]),
      startTime: new FormControl('', [Validators.pattern('^\\d{2}\\:\\d{2}\\:\\d{2}$')]),
      endTime: new FormControl('', [Validators.pattern('^\\d{2}\\:\\d{2}\\:\\d{2}$')]),
      sortBill: new FormControl(''),
    });
  }

  setPage(i) {
    this.page = i;
    this.search(i);
  }

  openDialogDelete(): void {
    const id = this.idDialog;
    const name = this.nameDialog;
    let dialogRef = this.dialog.open(WarehouseImportDerugDeleteComponent, {
        data: {id, name}
      }
    );
    dialogRef.afterClosed().subscribe(() => {
      this.importBillServiceService.getAllBill(this.page);
    });
  }


  subDate(dateTime: string) {
    const v = dateTime.substr(0, 10);
    return v;
  }

  subTime(dateTime: string) {
    const v = dateTime.substr(11, 16);
    return v;
  }


  nextPage() {
    if (this.page < this.pages.length - 1) {
      this.page = this.page + 1;
      if (this.flag) {
        this.search(this.page);
      } else {
        this.getListBill(this.page);
      }
    }
  }

  previousPage() {
    if (this.page > 0) {
      this.page = this.page - 1;
      this.search(this.page);
    }
  }

  search(page) {
    // Date
    this.flag = true;
    if (this.searchBill.value.startDate == '' && this.searchBill.value.endDate == '') {
      this.searchBill.value.startDate = this.startDate;
      this.searchBill.value.endDate = this.nowDate;
    } else if (this.searchBill.value.endDate == '') {
      this.searchBill.value.endDate = this.nowDate;
    } else if (this.searchBill.value.startDate == '') {
      this.searchBill.value.startDate = this.startDate;
    }
    // if sort trong
    if (this.searchBill.value.sortBill == '') {
      this.searchBill.value.sortBill = this.invoiceDate;
    }
    this.startDateTime = this.searchBill.value.startDate + this.searchBill.value.startTime;
    this.endDateTime = this.searchBill.value.endDate + this.searchBill.value.endTime;
    console.log('ngày bắt đầu' + this.startDateTime);
    console.log('ngày Kết thúc' + this.endDateTime);

    this.importBillServiceService.getSearchSortPaging(this.searchBill.value.billCode, this.startDateTime, this.endDateTime, this.searchBill.value.sortBill, page).subscribe((data: IImportBillDto[]) => {
      if (data == null) {
        this.message = 'Thông tin bạn tìm kiếm hiện không có trong hệ thống ';
        alert(this.message);
      } else {
        data['content'].forEach(b => {
          b.date = this.subDate(b.invoiceDate);
          b.time = this.subTime(b.invoiceDate);
        });
        this.bills = data['content'];
        this.pages = new Array(data['totalPages']);
        this.totalPage = this.pages.length - 1;
      }
    });
  }

  // search(page) {
  //   this.flag = true;
  //   if (this.searchBill.value.startDate == '' && this.searchBill.value.endDate == '') {
  //     this.searchBill.value.startDate = this.startDate;
  //     this.searchBill.value.endDate = this.endDate;
  //   }
  //   //  else if(this.searchBill.value.endDate == ''){
  //   //   this.searchBill.value.endDate =this.nowDate;
  //   //   this.searchBill.value.endDate =this.endDate;
  //   // }
  //   if (this.searchBill.value.sortBill == '') {
  //     this.searchBill.value.sortBill = this.invoiceDate;
  //   }
  //   this.startTime = this.searchBill.value.startTime;
  //   this.endTime = this.searchBill.value.endTime;
  //   this.startDateTime = this.startDate + this.startTime;
  //   this.endDateTime = this.endDate + this.endTime;
  //   // tslint:disable-next-line:max-line-length
  //
  //   this.importBillServiceService.getSearchSortPaging(this.searchBill.value.billCode, this.startDateTime, this.endDateTime, this.searchBill.value.sortBill, page).subscribe((data: IImportBillDto[]) => {
  //     if (data == null) {
  //       this.message = 'Thông tin bạn tìm kiếm hiện không có trong hệ thống ';
  //       alert(this.message);
  //     } else {
  //       data['content'].forEach(b => {
  //         b.date = this.subDate(b.invoiceDate);
  //         b.time = this.subTime(b.invoiceDate);
  //       });
  //       this.bills = data['content'];
  //       this.pages = new Array(data['totalPages']);
  //       this.totalPage = this.pages.length - 1;
  //     }
  //   });
  // }

  getId(id: any, name: any) {
    this.idDialog = id;
    this.nameDialog = name;
  }

  changColor(importBill: ImportBill) {
    this.selectedImportbill = importBill;
  }

  getListBill(pageable) {
    this.page = pageable;
    this.importBillServiceService.getAllBillPaging(pageable).subscribe(data => {
      data['content'].forEach(b => {
        b.date = this.subDate(b.invoiceDate);
        b.time = this.subTime(b.invoiceDate);
      });
      this.bills = data['content'];
      this.pages = new Array(data['totalPages']);
      this.totalPage = this.pages.length - 1;
    }, error => console.log(error));
  }
}

