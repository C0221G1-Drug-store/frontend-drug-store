import { Component, OnInit } from '@angular/core';
import {DrugOfBill} from '../../../model/drug-of-bill';
import {Drug} from '../../../model/drug';
import {MatDialog} from '@angular/material/dialog';
import {Router} from '@angular/router';
import {DrugService} from '../../../service/drug.service';
import {BillSaleService} from '../../../service/bill-sale.service';
import {FormControl, FormGroup} from '@angular/forms';
import {Customer} from '../../../model/customer';
import {Employee} from '../../../model/employee';
import {DeleteComponent} from '../delete/delete.component';

@Component({
  selector: 'app-wholesale',
  templateUrl: './wholesale.component.html',
  styleUrls: ['./wholesale.component.css']
})
export class WholesaleComponent implements OnInit {
  drugOfBillList: DrugOfBill[] = [];
  total: number;
  drugs: Drug[] = [];
  drug = null;
  drugOfBill: DrugOfBill;
  index: number;
  quantity1: number;
  customerList: Customer[] = [];
  employeeList: Employee[] = [];

  billSaleForm: FormGroup = new FormGroup(
    {
      billSaleId: new FormControl(''),
      employee: new FormControl(''),
      billSaleCode: new FormControl('HDBS'),
      invoiceDate: new FormControl(''),
      customer: new FormControl(''),
      billSaleNote: new FormControl(''),
      totalMoney: new FormControl(),
      billSaleType: new FormControl('Bán sỉ'),
    }
  );

  constructor(private dialog: MatDialog,
              private router: Router,
              private billSaleService: BillSaleService) {
    const state = this.router.getCurrentNavigation().extras.state as {data};
    if (state != null) {
      this.drugOfBillList = state.data;
    }
    // tslint:disable-next-line:prefer-for-of
    for (let i = 0; i < this.drugOfBillList.length; i++) {
      this.total += this.drugOfBillList[i].quantity * this.drugOfBillList[i].drug.wholesaleProfitRate;
    }
  }

  ngOnInit(): void {
    this.getAllDrug();
    this.getAllCustomer();
    this.getAllEmployee();
  }

  getAllDrug() {
    this.billSaleService.getListDrug().subscribe(next => {
      this.drugs = next;
    });
  }
  getAllCustomer() {
    this.billSaleService.getListCustomer().subscribe(next => {
      this.customerList = next;
    });
  }
  getAllEmployee() {
    this.billSaleService.getListEmployee().subscribe(next => {
      this.employeeList = next;
    });
  }
  getDrug(tam) {
    this.drugOfBill = {drug: tam , quantity : 5};
    this.drugOfBillList.push(this.drugOfBill);
    // tslint:disable-next-line:prefer-for-of
    this.total = 0;
    // tslint:disable-next-line:prefer-for-of
    for (let i = 0; i < this.drugOfBillList.length; i++) {
      this.total += this.drugOfBillList[i].quantity * this.drugOfBillList[i].drug.wholesaleProfitRate;
    }
  }

  submit() {
    // @ts-ignore
    this.billSaleForm.get('totalMoney').setValue(this.total);
    const billSale = this.billSaleForm.value;
    // tslint:disable-next-line:no-unused-expression
    this.billSaleService.createBillSale(billSale).subscribe(() => {
      alert('Thêm thành công');
      for (let i = 0; i < this.drugOfBillList.length; i++) {
        this.drugOfBill = this.drugOfBillList[i];
        console.log(this.drugOfBillList[i]);
        this.billSaleService.createDrugOfBill(this.drugOfBill).subscribe(() => {
          alert('Thêm thành công' + i);
          this.drugOfBillList = [];
        });
      }
    }
    );
    // tslint:disable-next-line:prefer-for-of
  }

  send(drugOfBill) {
    this.drugOfBill = drugOfBill;
  }
  openDeleteDialog() {
    const drugOfBill = this.drugOfBill;
    const dialog = this.dialog.open(DeleteComponent , {
      data: [this.drugOfBillList , {drugOfBill}, ]
    });
    dialog.afterClosed().subscribe(() => {
      this.total = 0;
      // tslint:disable-next-line:prefer-for-of
      for (let i = 0; i < this.drugOfBillList.length; i++) {
        this.total += this.drugOfBillList[i].quantity * this.drugOfBillList[i].drug.wholesaleProfitRate;
      }
    })
    console.log(drugOfBill);
  }

  addDrug(drug, number1) {
    this.drugOfBill = {drug , quantity : number1, billSale: this.billSaleForm.value };
    this.drugOfBillList.push(this.drugOfBill);
    this.total = 0;
    // tslint:disable-next-line:prefer-for-of
    for (let i = 0; i < this.drugOfBillList.length; i++) {
      this.total += this.drugOfBillList[i].quantity * this.drugOfBillList[i].drug.wholesaleProfitRate;
    }
    console.log(this.drugOfBillList);
  }
}
