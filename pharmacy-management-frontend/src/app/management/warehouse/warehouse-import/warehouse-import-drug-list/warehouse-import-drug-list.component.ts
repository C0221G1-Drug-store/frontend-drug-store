import {Component, OnInit} from '@angular/core';
import {ImportBill} from '../model/import-bill';
import {ImportBillServiceService} from '../service/import-bill-service.service';
import {FormControl, FormGroup} from '@angular/forms';

@Component({
  selector: 'app-warehouse-import-drug-list',
  templateUrl: './warehouse-import-drug-list.component.html',
  styleUrls: ['./warehouse-import-drug-list.component.css']
})
export class WarehouseImportDrugListComponent implements OnInit {
  importBills: ImportBill [];
  indexPagination = 1;
  totalPagination: number;
  listImportBillNotPagination: ImportBill[];
  importCode = '';
  message = '';
  public searchBill: FormGroup;

  constructor(private importBillServiceService: ImportBillServiceService) {
  }

  ngOnInit(): void {
    this.getAll(this.indexPagination);
    this.importBillServiceService.getAllImportBillNotPagination().subscribe((data: ImportBill[]) => {
      this.listImportBillNotPagination = data;
      // tslint:disable-next-line:triple-equals
      if ((this.listImportBillNotPagination.length % 5) != 0) {
        this.totalPagination = (Math.round(this.listImportBillNotPagination.length / 5)) + 1;
      }
    });

    this.searchBill = new FormGroup({
      billCode: new FormControl(''),
      startDate: new FormControl(''),
      endDate: new FormControl(''),
      // typeVaccine: new FormControl(''),
      // originVaccine: new FormControl(''),
      // statusVaccine: new FormControl('')
    });

  }

  // getAll() {
  //   this.importBillServiceService.getAll().subscribe(importBills => {
  //     importBills.forEach(b => {
  //       b.date = this.subDate(b.invoiceDate);
  //       b.time = this.subTime(b.invoiceDate);
  //     });
  //     this.importBills = importBills;
  //   });
  // }
  getAll(index: number) {
    this.importBillServiceService.getAllImportBill(index).subscribe(importBills => {
      importBills.forEach(b => {
        b.date = this.subDate(b.invoiceDate);
        b.time = this.subTime(b.invoiceDate);
      });
      this.importBills = importBills;
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

//  page

  // findPaginnation() {
  //   this.vaccineService.getAllVaccine((this.indexPagination * 5) - 5).subscribe((data: IVaccineDTO[]) => {
  //     this.vaccines = data;
  //   })
  // }

  indexPaginationChange(value: number) {
    this.indexPagination = value;
  }

  // firstPage() {
  //   this.indexPagination = 1;
  //   this.ngOnInit();
  // }

  nextPage() {
    this.indexPagination = this.indexPagination + 1;
    if (this.indexPagination > this.totalPagination) {
      this.indexPagination = this.indexPagination - 1;
    }
    this.getAll((this.indexPagination * 5) - 5);
  }

  previousPage() {
    this.indexPagination = this.indexPagination - 1;
    // tslint:disable-next-line:triple-equals
    if (this.indexPagination == 0) {
      this.indexPagination = 1;
    } else {
      this.getAll((this.indexPagination * 5) - 5);
    }
  }

  search() {
      // tslint:disable-next-line:max-line-length
    this.importBillServiceService.searchBill(this.searchBill.value.billCode, this.searchBill.value.startDate, this.searchBill.value.endDate).subscribe((data: ImportBill[]) => {
        if (data == null) {
          this.message = 'Thông tin bạn tìm kiếm hiện không có trong hệ thống ';
          alert(this.message);
        } else {
          data.forEach(b => {
            b.date = this.subDate(b.invoiceDate);
            b.time = this.subTime(b.invoiceDate);
          });
          this.importBills = data;
        }
      });
    }
}

