import {Component, OnInit} from '@angular/core';
import {BillSale} from "../../../model/bill-sale";
import {BillSaleService} from "../../../service/bill-sale.service";
import {MatDialog} from "@angular/material/dialog";
import {SalesInvoiceDeleteComponent} from "../sales-invoice-delete/sales-invoice-delete.component";
import {SalesInvoiceDetailComponent} from "../sales-invoice-detail/sales-invoice-detail.component";

@Component({
  selector: 'app-sales-invoice',
  templateUrl: './sales-invoice.component.html',
  styleUrls: ['./sales-invoice.component.css']
})
export class SalesInvoiceComponent implements OnInit {
  billSales: BillSale[] = [];
  idBillsales: number;
  selectedBillSale: BillSale;
  billSale1: BillSale;
  search1: string;
  search2: string;
  search3: string;
  search4: string;
  search5: string;
  search6: string;
  p1: string;
  p2: string;
  p3: string;
  p4: string;
  p5 ='';
  p6 ='';
  err = true;
  pages: Array<any>;
  page = 0;

  constructor(private billSaleService: BillSaleService, public dialog: MatDialog) {
  }

  ngOnInit(): void {
    this.getAll();
  }

  getAll() {
    this.billSaleService.getAll(this.page).subscribe(next => {
      this.billSales = next['content'];
      this.pages = new Array<any>(next['totalPages']);
      console.log(this.pages);
      this.billSales.forEach(d => {
        d.date = this.subDate(d.invoiceDate);
        d.time = this.subTime(d.invoiceDate);
      });
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


  changColorandId(billSaleId: number) {
    this.err = !this.err;
    if (this.err === false) {
      this.idBillsales = billSaleId;
      console.log(this.idBillsales);
      this.billSaleService.findById(this.idBillsales).subscribe(next => {
        this.billSale1 = next;
      });
    } else {
      this.idBillsales = null;
      console.log(this.idBillsales);
    }

  }

  changColor(billSale: BillSale) {
    this.selectedBillSale = billSale;
  }

  onDeleteHandler() {
    if (this.idBillsales == null) {
      const dialogRef = this.dialog.open(SalesInvoiceDeleteComponent, {
        width: '250px',
      });
    } else {
      this.billSaleService.findById(this.idBillsales).subscribe(next => {
        this.billSale1 = next;
      });
      console.log(this.billSale1);
      const dialogRef = this.dialog.open(SalesInvoiceDeleteComponent, {
        width: '250px',
        data: this.billSale1
      });

      dialogRef.afterClosed().subscribe(result => {
        console.log('The dialog was closed');
        console.log(result);
        if (result) {
          this.billSaleService.deleteBillSale(this.idBillsales, this.billSale1).subscribe(next => {
            alert('xóa thành công');
            this.getAll();
          });
        }
      });
    }

  }

  onDetailHandler() {
    if (this.idBillsales == null) {
      const dialogRef = this.dialog.open(SalesInvoiceDetailComponent, {
        width: '250px',
      });
    } else {
      const dialogRef = this.dialog.open(SalesInvoiceDetailComponent, {
        width: '500px',
        data: this.billSale1
      });

      dialogRef.afterClosed().subscribe(result => {
        console.log('The dialog was closed');
        console.log(result);
        if (result) {
          alert('in thành công');
          this.getAll();
        }
      });
    }
  }

  search() {
    console.log(this.search1);
    console.log(this.search2);
    console.log(this.search3);
    console.log(this.search4);
    console.log(this.search5);
    console.log(this.search6);
    // tslint:disable-next-line:max-line-length
    if (this.search1 == null || this.search2 == null || this.search3 == null || this.search4 == null || this.search5 == null || this.search6 == null) {
      if (this.search1 == null) {
        this.p1 = 'ngày không được để trống';
      } else {
        this.p1 = null;
      }
      if (this.search2 == null) {
        this.p2 = 'ngày không được để trống';
      } else {
        this.p2 = null;
      }
      if (this.search3 == null) {
        this.p3 = 'giờ không được để trống';
      } else {
        this.p3 = null;
      }
      if (this.search4 == null) {
        this.p4 = 'giờ không được để trống';
      } else {
        this.p4 = null;
      }
      if (this.search5 == null) {
        this.p5 = 'không được để trống';
      } else {
        this.p5 = null;
      }
      if (this.search6 == null) {
        this.p6 = 'không được để trống';
      } else {
        this.p6 = null;
      }
    } else {

      if (this.search1 == null || this.search2 == null || this.search3 == null || this.search4 == null || this.search5 == null || this.search6 == null) {
        if (this.search1 == null) {
          this.p1 = 'ngày không được để trống';
        }
        if (this.search2 == null) {
          this.p2 = 'ngày không được để trống';
        }
        if (this.search3 == null) {
          this.p3 = 'giờ không được để trống';
        }
        if (this.search4 == null) {
          this.p4 = 'giờ không được để trống';
        }

      } else {

        this.billSaleService.searchBillSale(this.search1, this.search2, this.search3, this.search4, this.search5, this.search6, this.page).subscribe(next => {
          this.billSales = next['content'];
          if (this.billSales.length === 0) {
            alert('Chọn sai thời gian cần tra cứu');
          }
          this.pages = new Array<any>(next['totalPages']);
          console.log(this.pages);
          next['content'].forEach(d => {
            d.date = this.subDate(d.invoiceDate);
            d.time = this.subTime(d.invoiceDate);
          });
        });
      }

    }
  }



  setPage(i: number) {
    this.page = i;
    this.getAll();

  }

  previous() {
    if (this.page === 0) {
      alert('Khong tim thay trang');
    } else {
      this.page = this.page - 1;
      this.getAll();
    }
  }

  next() {
    if (this.page > this.pages.length - 2) {
      alert('ko tim thay trang');
    } else {
      this.page = this.page + 1;
      this.getAll();
    }
  }

}
