import {Component, OnInit} from '@angular/core';
import {BillSale} from "../../../model/bill-sale";
import {BillSaleService} from "../../../service/bill-sale.service";
import {MatDialog} from "@angular/material/dialog";
import {SalesInvoiceDeleteComponent} from "../sales-invoice-delete/sales-invoice-delete.component";
import {SalesInvoiceDetailComponent} from "../sales-invoice-detail/sales-invoice-detail.component";
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {MatSnackBar} from "@angular/material/snack-bar";


@Component({
  selector: 'app-sales-invoice',
  templateUrl: './sales-invoice.component.html',
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

  public searchForm: FormGroup = new FormGroup({
    search1: new FormControl('', [Validators.required, Validators.pattern(/^(19|20)?[0-9]{2}[- /.](0?[1-9]|1[012])[- /.](0?[1-9]|[12][0-9]|3[01])$/)]),
    search2: new FormControl('', [Validators.required, Validators.pattern(/^(19|20)?[0-9]{2}[- /.](0?[1-9]|1[012])[- /.](0?[1-9]|[12][0-9]|3[01])$/)]),
    search3: new FormControl('', [Validators.required, Validators.pattern(/^([0-9]|0[0-9]|1[0-9]|2[0-3]):[0-5][0-9]$/)]),
    search4: new FormControl('', [Validators.required, Validators.pattern(/^([0-9]|0[0-9]|1[0-9]|2[0-3]):[0-5][0-9]$/)]),
    search5: new FormControl(''),
    search6: new FormControl('')
  });

  constructor(private billSaleService: BillSaleService, public dialog: MatDialog, private snackBar: MatSnackBar) {
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
      console.log("Trường hợp id = null    "+ this.idBillsales)
      const dialogRef = this.dialog.open(SalesInvoiceDeleteComponent, {
        width: '250px',
      });
    } else {
      console.log("Trường hợp id khác null     "+ this.idBillsales)
      this.billSaleService.findById(this.idBillsales).subscribe(next => {
        this.billSale1 = next;
        console.log("findbyid     "+this.billSale1);
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
            this.snackBar.open('xóa thành công', '', {
              duration: 5000,
              verticalPosition: 'top'});
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
          this.snackBar.open('in thành công', '', {
            duration: 5000,
            verticalPosition: 'top'});
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
        this.snackBar.open('Chọn sai thời gian cần tra cứu', '', {
          duration: 5000,
          verticalPosition: 'top'});
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
      this.snackBar.open('không tìm thấy trang', '', {
        duration: 5000,
        verticalPosition: 'top'});
    } else {
      this.page = this.page - 1;
      this.getAll();
    }
  }

  next() {
    if (this.page > this.pages.length - 2) {
      this.snackBar.open('không tìm thấy trang', '', {
        duration: 5000,
        verticalPosition: 'top'});
    } else {
      this.page = this.page + 1;
      this.getAll();
    }
  }

  get searchValue1() {
    return this.searchForm.get('search1');
  }
  get searchValue2() {
    return this.searchForm.get('search2');
  }
  get searchValue3() {
    return this.searchForm.get('search3');
  }
  get searchValue4() {
    return this.searchForm.get('search4');
  }

}
