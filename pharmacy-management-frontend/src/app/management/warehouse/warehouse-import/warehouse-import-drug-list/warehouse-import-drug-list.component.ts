
import {Component, OnInit} from '@angular/core';
import {ImportBill} from '../model/import-bill';
import {ImportBillServiceService} from '../service/import-bill-service.service';
import {FormControl, FormGroup} from '@angular/forms';
import {MatDialog} from '@angular/material/dialog';
import {WarehouseImportDerugDeleteComponent} from '../warehouse-import-derug-delete/warehouse-import-derug-delete.component';
import {IImportBillDto} from '../model/iimport-bill-dto';
import {ActivatedRoute, Router} from '@angular/router';


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
  indexPagination = 0;
  startDateTime = '';
  endDateTime = '';
  message = '';
  startDate = '1000-01-01 ';
  endDate = '9999-09-09 ';
  startTime = '';
  endTime = '';
  public searchBill: FormGroup;
  idDialog: any;
  nameDialog: any;
  selectedImportbill: ImportBill;

  constructor(private importBillServiceService: ImportBillServiceService,
              private dialog: MatDialog,
              private route: ActivatedRoute,
              private router: Router) {
  }

  ngOnInit(): void {
    this.getListBill(this.page);

    this.searchBill = new FormGroup({
      billCode: new FormControl(''),
      startDate: new FormControl(''),
      endDate: new FormControl(''),
      startTime: new FormControl(''),
      endTime: new FormControl(''),
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
    this.flag = true;
    if (this.searchBill.value.startDate == '' && this.searchBill.value.endDate == '') {
      this.searchBill.value.startDate = this.startDate;
      this.searchBill.value.endDate = this.endDate;
    }
    if (this.searchBill.value.sortBill == '') {
      this.searchBill.value.sortBill = this.invoiceDate;
    }
    this.startTime = this.searchBill.value.startTime;
    this.endTime = this.searchBill.value.endTime;
    this.startDateTime = this.startDate + this.startTime;
    this.endDateTime = this.endDate + this.endTime;
    // tslint:disable-next-line:max-line-length

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

  addNewImportBill() {
    this.router.navigate(['warehouse/import/add']);
  }
}

