import { Component, OnInit } from '@angular/core';
import {MatDialog} from '@angular/material/dialog';
import {Router} from '@angular/router';
import {DrugService} from '../../../service/drug.service';
import {DrugOfBill} from '../../../model/drug-of-bill';
import {Drug} from '../../../model/drug';
import { DeleteComponent } from '../delete/delete.component';
import {Bill} from '../../../model/bill';
import {PrescriptionService} from '../../../service/prescription.service';


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
  bill: Bill;
  dateSetBill = '';
  note = '' ;

  constructor(private dialog: MatDialog,
              private router: Router,
              private drugService: DrugService,
              private prescriptionService: PrescriptionService) {
    const state = this.router.getCurrentNavigation().extras.state as {data};
    if (state != null) {
      this.drugOfBills = state.data;
    }
    // tslint:disable-next-line:prefer-for-of
    for (let i = 0; i < this.drugOfBills.length; i++) {
      this.total += this.drugOfBills[i].quantity * this.drugOfBills[i].drug.price;
    }
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
    let drugOfBill = this.drugOfBill;
    const dialog = this.dialog.open(DeleteComponent , {
      height: '250px' , width: '300px',
      data: [this.drugOfBills , {drugOfBill}]
    });
    dialog.afterClosed().subscribe(() => {
      this.total = 0;
      for (let i = 0; i < this.drugOfBills.length; i++) {
        this.total += this.drugOfBills[i].quantity * this.drugOfBills[i].drug.price;
      }
    });
    this.drugOf = null;
    console.log(drugOfBill);
  }

  addDrug(drug, number1) {
    this.drugOfBill = {drug , quantity : number1};
    this.drugOfBills.push(this.drugOfBill);
    this.total = 0;
    // tslint:disable-next-line:prefer-for-of
    for (let i = 0; i < this.drugOfBills.length; i++) {
      this.total += this.drugOfBills[i].quantity * this.drugOfBills[i].drug.price;
    }
  }

  showChoose(drugOfBill: DrugOfBill) {
    this.drugOf = drugOfBill;
  }

  saveBill() {
    this.bill = {customer: 'khách lẻ', employee: 'tam' , total: this.total, setBillDate: this.dateSetBill, note: this.note};
    this.prescriptionService.saveBIll(this.bill).subscribe();
  }
}
