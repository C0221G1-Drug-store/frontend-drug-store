import {Component, OnInit} from '@angular/core';
import {BillSaleService} from '../../../service/bill-sale.service';
import {BillSale} from '../../../model/bill-sale';
import {DrugOfBill} from '../../../model/drug-of-bill';
import {MatDialog} from '@angular/material/dialog';
import {DeleteCustomerRefundComponent} from '../delete-customer-refund/delete-customer-refund.component';

@Component({
  selector: 'app-customer-refund',
  templateUrl: './customer-refund.component.html',
  styleUrls: ['./customer-refund.component.css']
})
export class CustomerRefundComponent implements OnInit {
  inputSearch: any;
  billSale: BillSale = null;
  total = 0;
  totalRefund = 0;
  constructor(private billSaleService: BillSaleService,
              private dialog: MatDialog) {
  }

  drugOfBillList: DrugOfBill[];
  drugOfBill: DrugOfBill;
  drugOfBillListDelete: DrugOfBill[] = [];

  ngOnInit(): void {
  }

  searchBillSale() {
    this.billSaleService.getBillSaleById(this.inputSearch).subscribe(data => {
      this.billSale = data;
    });
    this.billSaleService.getDrugOfBillByBillSaleId(this.inputSearch).subscribe(data => {
      this.drugOfBillList = data;
      this.total = 0;
      // tslint:disable-next-line:prefer-for-of
      for (let i = 0; i < this.drugOfBillList.length; i++) {
        this.total += this.drugOfBillList[i].quantity * this.drugOfBillList[i].drug.wholesaleProfitRate;
      }
    });
  }

  send(drugOfBill) {
    this.drugOfBill = drugOfBill;
  }

  dialogDelete() {
    const drugOfBill = this.drugOfBill;
    const dialogRef = this.dialog.open(DeleteCustomerRefundComponent, {
        data: [drugOfBill, this.drugOfBillList, this.drugOfBillListDelete]
      }
    );
    dialogRef.afterClosed().subscribe(() => {
      this.total = 0;
      // tslint:disable-next-line:prefer-for-of
      for (let i = 0; i < this.drugOfBillList.length; i++) {
        this.total += this.drugOfBillList[i].quantity * this.drugOfBillList[i].drug.wholesaleProfitRate;
      }
    });
  }

  payment() {
    this.billSale.totalMoney = this.total;
    this.billSaleService.updateBillSale(this.billSale).subscribe(() => {
      alert('Thêm thành công');
    });
  }
}
