import {Component, OnInit} from '@angular/core';
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
import {formatDate} from '@angular/common';
import {ToastrService} from 'ngx-toastr';

@Component({
  selector: 'app-wholesale',
  templateUrl: './wholesale.component.html',
  styleUrls: ['./wholesale.component.css']
})
export class WholesaleComponent implements OnInit {
  drugOfBillList: DrugOfBill[] = [];
  idSelect: number;
  total: number;
  drugs: Drug[] = [];
  selectDrug = null;
  drugOfBill: DrugOfBill;
  index: number;
  quantity: number;
  today = new Date();
  todaysDataTime = formatDate(this.today, 'yyyy-MM-dd', 'en-US', '+0530');
  customerList: Customer[] = [];
  employeeList: Employee[] = [];
  numRandom = Math.floor(Math.random() * 10000);
  billSaleForm: FormGroup = new FormGroup(
    {
      billSaleId: new FormControl(this.numRandom),
      employee: new FormControl(),
      billSaleCode: new FormControl('HDBS'),
      invoiceDate: new FormControl(this.todaysDataTime),
      customer: new FormControl(),
      billSaleNote: new FormControl(''),
      totalMoney: new FormControl(),
      billSaleType: new FormControl('Bán sỉ'),
    }
  );

  constructor(private dialog: MatDialog,
              private router: Router,
              private billSaleService: BillSaleService,
              private  toast: ToastrService) {
    const state = this.router.getCurrentNavigation().extras.state as { data };
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

  payment() {
    // tslint:disable-next-line:max-line-length
    if (this.billSaleForm.get('customer').value == null || this.billSaleForm.get('employee').value == null || this.drugOfBillList.length === 0 ) {
      this.toast.error('Thanh toán thất bại', 'Alert');
    } else {
      this.billSaleForm.get('totalMoney').setValue(this.total);
      this.billSaleForm.get('billSaleId').setValue(this.numRandom);
      const billSale = this.billSaleForm.value;
      this.billSaleService.createBillSale(billSale).subscribe(() => {
          // tslint:disable-next-line:prefer-for-of
          for (let i = 0; i < this.drugOfBillList.length; i++) {
            this.drugOfBill = this.drugOfBillList[i];
            this.drugOfBill.drug.drugAmount = this.drugOfBill.drug.drugAmount - this.drugOfBill.quantity ;
            this.billSaleService.createDrugOfBill(this.drugOfBill).subscribe(() => {
              this.billSaleService.updateDrug(this.drugOfBill.drug).subscribe(() => {
              });
            });
          }
          this.toast.success('Thanh toán thành công', 'Alert');
        }, error => {
          this.toast.error('Thanh toán thất bại', 'Alert');
        }
      );
    }
  }

  send(drugOfBill, index) {
    this.drugOfBill = drugOfBill;
    this.idSelect = index;
  }

  openDeleteDialog() {
    const drugOfBill = this.drugOfBill;
    const dialog = this.dialog.open(DeleteComponent, {
      data: [this.drugOfBillList, {drugOfBill}]
    });
    dialog.afterClosed().subscribe(() => {
      this.total = 0;
      // tslint:disable-next-line:prefer-for-of
      for (let i = 0; i < this.drugOfBillList.length; i++) {
        this.total += this.drugOfBillList[i].quantity * this.drugOfBillList[i].drug.wholesaleProfitRate;
      }
    });
  }

  addDrug(drug, number1) {
    if (this.billSaleForm.get('customer').value == null || this.billSaleForm.get('employee').value == null) {
      this.toast.warning('Nhập thông tin hóa đơn trước khi thêm thuốc', 'Alert');
    } else if (this.selectDrug === null || this.quantity === undefined) {
      this.toast.warning('Vui lòng chọn thuốc và nhập số lượng', 'Alert');
    } else if (this.quantity <= 0 ) {
      this.toast.warning('Số lượng không hợp lệ', 'Alert');
    } else {
      this.drugOfBill = {drug, quantity: number1, billSale: this.billSaleForm.value};
      this.drugOfBillList.push(this.drugOfBill);
      this.total = 0;
      // tslint:disable-next-line:prefer-for-of
      for (let i = 0; i < this.drugOfBillList.length; i++) {
        this.total += this.drugOfBillList[i].quantity * this.drugOfBillList[i].drug.wholesaleProfitRate;
      }
    }
  }
}
