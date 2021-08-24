import { Component, OnInit } from '@angular/core';
import {MatDialog} from '@angular/material/dialog';
import {Router, NavigationExtras} from '@angular/router';
import {DrugService} from '../../../service/drug.service';
import {DrugOfBill} from '../../../model/drug-of-bill';
import {Drug} from '../../../model/drug';
import { DeleteComponent } from '../delete/delete.component';
import {BillSale} from '../../../model/billSale';
import {PrescriptionService} from '../../../service/prescription.service';
import {ToastrService} from 'ngx-toastr';
import {formatDate} from '@angular/common';


@Component({
  selector: 'app-sale',
  templateUrl: './sale.component.html',
  styleUrls: ['./sale.component.css']
})
export class SaleComponent implements OnInit {
  drugOfBills: DrugOfBill[] = [];
  total = 0;
  drugs: Drug[] = [];
  drug = null;
  drugOfBill: DrugOfBill;
  index: number;
  number1: number;
  drugOf: DrugOfBill;
  bill: BillSale;
  dateSetBill = '';
  note = '' ;
  billSaleCode = '';
  today = new Date();
  todaysDataTime = formatDate(this.today, 'yyyy-MM-dd', 'en-US', '+0530');
  numRandom = Math.floor(Math.random() * 10000);
  constructor(private dialog: MatDialog,
              private router: Router,
              private drugService: DrugService,
              private prescriptionService: PrescriptionService,
              private toast: ToastrService) {
    const state = this.router.getCurrentNavigation().extras.state as {data};
    if (state != null) {
      this.drugOfBills = state.data;
    }
    // tslint:disable-next-line:prefer-for-of
    for (let i = 0; i < this.drugOfBills.length; i++) {
      this.total += this.drugOfBills[i].quantity * this.drugOfBills[i].drug.price;
    }
    this.dateSetBill = this.todaysDataTime;
    this.billSaleCode = 'TT00' + this.numRandom;
  }

  ngOnInit(): void {
    this.getAllDrug();
  }
  getAllDrug() {
    this.drugService.getAll().subscribe(next => {
      this.drugs = next;
    });
  }

  getDrug(tam) {
    this.drugOfBill = {drug: tam , quantity : 5};
    this.drugOfBills.push(this.drugOfBill);
    // tslint:disable-next-line:prefer-for-of
    this.total = 0;
    // tslint:disable-next-line:prefer-for-of
    for (let i = 0; i < this.drugOfBills.length; i++) {
      this.total += this.drugOfBills[i].quantity * this.drugOfBills[i].drug.price;
    }
  }

  send(drugOfBill, i) {
    this.drugOfBill = drugOfBill;
    this.index = i;
  }
  openDeleteDialog() {
    if (this.drugOfBill === undefined) {
      this.toast.success('bạn chưa chọn thuốc');
    } else {
      const drugOfBill = this.drugOfBill;
      const dialog = this.dialog.open(DeleteComponent , {
        height: '250px' , width: '300px',
        data: [this.drugOfBills , {drugOfBill}]
      });
      dialog.afterClosed().subscribe(() => {
        this.total = 0;
        // tslint:disable-next-line:prefer-for-of
        for (let i = 0; i < this.drugOfBills.length; i++) {
          this.total += this.drugOfBills[i].quantity * this.drugOfBills[i].drug.price;
        }
      });
      this.drugOfBill = undefined;
      this.drugOf = null;
    }
  }

  addDrug(drug, number1) {
    if (drug === null) {
      this.toast.success('bạn phải chọn thuốc cần thêm');
    } else if (number1 === undefined) {
      this.toast.success('bạn phải nhập số lượng thuốc');
    } else {
      this.drugOfBill = {drug, quantity: number1};
      this.drugOfBills.push(this.drugOfBill);
      this.total = 0;
      // tslint:disable-next-line:prefer-for-of
      for (let i = 0; i < this.drugOfBills.length; i++) {
        this.total += this.drugOfBills[i].quantity * this.drugOfBills[i].drug.price;
      }
    }
    this.drugOfBill = undefined;
  }

  showChoose(drugOfBill: DrugOfBill) {
    this.drugOf = drugOfBill;
  }

  saveBill() {
    if (this.drugOfBills.length === 0) {
      this.toast.success('bạn chưa thêm thuốc vào hóa đơn');
    } else {
      this.bill = {
        code: this.billSaleCode,
        customer: 'khách lẻ',
        employee: 'tam',
        totalMoney: this.total,
        invoiceDate: this.todaysDataTime,
        billSaleNote: this.note
      };
      this.prescriptionService.saveBIll(this.bill).subscribe(next => {
        this.prescriptionService.findNewBill().subscribe(bill => {
          this.prescriptionService.findNewBill().subscribe(bil => {
            this.bill = bil;
            // tslint:disable-next-line:prefer-for-of
            for (let i = 0; i < this.drugOfBills.length; i++) {
              this.drugOfBills[i].bill = this.bill;
              this.prescriptionService.save(this.drugOfBills[i]).subscribe();
            }
            const navigationExtras: NavigationExtras = {state: {data: this.bill}};
            this.router.navigate(['/'], navigationExtras);
          });
        });
      });
    }
  }
}
