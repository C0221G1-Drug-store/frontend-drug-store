import {Component, OnInit} from '@angular/core';
import {BillSale} from "../../../model/bill-sale";
import {BillSaleService} from "../../../service/bill-sale.service";
import {MatDialog} from "@angular/material/dialog";
import {SalesInvoiceDeleteComponent} from "../sales-invoice-delete/sales-invoice-delete.component";
import {SalesInvoiceDetailComponent} from "../sales-invoice-detail/sales-invoice-detail.component";
import {FormControl, FormGroup, Validators} from "@angular/forms";

@Component({
  selector: 'app-sales-invoice',
  templateUrl:'./sales-invoice.component.html',
  styleUrls: ['./sales-invoice.component.css']
})
export class SalesInvoiceComponent implements OnInit {
  billSales: BillSale[] ;
  idBillsales: number;
  selectedBillSale: BillSale;
  billSale1: BillSale;
  search1: string;
  search2: string;
  search3: string;
  search4: string;
  search5 = '';
  search6 = '';
  err = true;
  pages: Array<any>;
  page = 0;




  constructor(private billSaleService: BillSaleService, public dialog: MatDialog) {
    this.getAll();
  }

  ngOnInit(): void {
  }

  getAll() {
    this.billSaleService.getAll(this.page).subscribe(next => {
      this.billSales = next['content'];
      this.pages = new Array<any>(next['totalPages']);
      this.billSales.forEach(d => {
        d.date = this.subDate(d.invoiceDate);
        d.time = this.subTime(d.invoiceDate);
      });
    });
    console.log(this.billSales)
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
        width: '300px',
        height: '150px',
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
        width: '1000px',
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
