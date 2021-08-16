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

@Component({
  selector: 'app-wholesale',
  templateUrl: './wholesale.component.html',
  styleUrls: ['./wholesale.component.css']
})
export class WholesaleComponent implements OnInit {
  data: DrugOfBill[] = [];
  total = 0;
  drugList: Drug[] = [];
  customerList: Customer[] = [];
  employeeList: Employee[] = [];
  drug = null;
  drugOfBill: DrugOfBill;
  quantity = 0;

  billSaleForm: FormGroup = new FormGroup(
    {
      billSaleId: new FormControl(''),
      employee: new FormControl(''),
      invoiceDate: new FormControl(''),
      customer: new FormControl(''),
      billSaleNote: new FormControl(''),
      totalMoney: new FormControl(this.total),
      billSaleType: new FormControl('Bán sỉ'),
    }
  );

  constructor(private dialog: MatDialog,
              private router: Router,
              private billSaleService: BillSaleService) {
    const state = this.router.getCurrentNavigation().extras.state as {data};
    if (state != null) {
      this.data = state.data;
    }
  }

  ngOnInit(): void {
    this.getAllDrug();
    this.getAllCustomer();
    this.getAllEmployee();
  }

  openDeleteDialog() {
    // const dialog = this.dialog.open(DeleteDialogComponent , {
    //   height: '250px' , width: '300px',
    //   data: {}
    // });
  }

  getAllDrug() {
    this.billSaleService.getListDrug().subscribe(next => {
      this.drugList = next;
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
    this.drugOfBill = {drug: tam , quantity : this.quantity};
    this.data.push(this.drugOfBill);
    // tslint:disable-next-line:prefer-for-of
    this.total = 0;
    // tslint:disable-next-line:prefer-for-of
    for (let i = 0; i < this.data.length; i++) {
      this.total += this.data[i].quantity * this.data[i].drug.retailProfitRate;
    }
    console.log(this.data);
    console.log(this.total);
  }

  submit() {
    const billSale = this.billSaleForm.value;
    this.billSaleService.createBillSale(billSale).subscribe(() => {
      alert('Thêm thành công');
    });
  }
}
