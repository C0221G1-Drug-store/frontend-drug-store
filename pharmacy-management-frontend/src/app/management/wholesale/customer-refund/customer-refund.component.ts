import {Component, OnInit} from '@angular/core';
import {BillSaleService} from '../../../service/bill-sale.service';
import {BillSale} from '../../../model/bill-sale';
import {DrugOfBill} from '../../../model/drug-of-bill';
import {MatDialog} from '@angular/material/dialog';
import {DeleteCustomerRefundComponent} from '../delete-customer-refund/delete-customer-refund.component';
import {formatDate} from '@angular/common';
import {ToastrService} from 'ngx-toastr';

@Component({
  selector: 'app-customer-refund',
  templateUrl: './customer-refund.component.html',
  styleUrls: ['./customer-refund.component.css']
})
export class CustomerRefundComponent implements OnInit {
  inputSearch: any;
  billSale: BillSale = null;
  total = 0;
  idDelete = 0;
  idDeleteList: [] = [];
  totalRefund = 0;
  today = new Date();
  todaysDataTime = '';
  constructor(private billSaleService: BillSaleService,
              private dialog: MatDialog,
              private toast: ToastrService) {
  }

  drugOfBillList: DrugOfBill[];
  drugOfBill: DrugOfBill = {};
  drugOfBillListDelete: DrugOfBill[] = [];

  ngOnInit(): void {
  }

  searchBillSale() {
    this.billSaleService.getBillSaleById(this.inputSearch).subscribe(data => {
      this.billSale = data;
      if (data == null) {
        this.toast.error('Không tìm thấy hóa đơn này', 'Alert');
        this.drugOfBillList = [];
        this.total = 0;
      } else {
        this.billSaleService.getDrugOfBillByBillSaleId(this.inputSearch).subscribe(data1 => {
          this.drugOfBillList = data1;
          if (data1 == null) {
            this.toast.error('Không có thuốc để hoàn trả', 'Alert');
          }
          this.total = 0;
          // tslint:disable-next-line:prefer-for-of
          for (let i = 0; i < this.drugOfBillList.length; i++) {
            this.total += this.drugOfBillList[i].quantity * this.drugOfBillList[i].drug.wholesaleProfitRate;
          }
        }, error => {
        });
      }
      this.totalRefund = this.billSale.totalMoney;
    }, c => {
      this.toast.error('Không tìm thấy hóa đơn này', 'Alert');
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
      // @ts-ignore
      this.idDeleteList.push(this.idDelete);
    });
  }

  payment() {
    console.log(this.drugOfBillListDelete);
    if (this.drugOfBillListDelete.length === 0) {
      this.toast.error('Thất bại', 'Alert');
    } else {
      this.billSale.totalMoney = this.total;
      this.billSaleService.updateBillSale(this.billSale).subscribe(() => {
        this.billSale.billSaleId = this.billSale.billSaleId + Math.floor(Math.random() * 1000);
        // @ts-ignore
        this.todaysDataTime = formatDate(this.today, 'yyyy-MM-dd', 'en-US', '+0530');
        this.billSale.invoiceDate = this.todaysDataTime;
        this.billSale.billSaleCode = 'HDHT';
        this.billSale.billSaleNote = 'Khách hoàn trả';
        this.billSale.billSaleType = 'Hoàn trả';
        this.billSale.totalMoney = this.totalRefund - this.total;
        console.log(this.billSale);
        this.billSaleService.createBillSale(this.billSale).subscribe(() => {
          // tslint:disable-next-line:prefer-for-of
          for (let i = 0; i < this.drugOfBillListDelete.length; i++) {
            this.drugOfBill = this.drugOfBillListDelete[i][0];
            this.drugOfBill.billSale = this.billSale;
            this.billSaleService.createDrugOfBill(this.drugOfBill).subscribe(() => {
            });
          }
          this.searchBillSale();
          this.toast.success('Hoàn trả thành công', 'Alert');
        }, error => {
          this.toast.error('Hoàn trả thất bại', 'Alert');
        });
      });
    }
  }

  getID(drugOfBillId: number) {
    // @ts-ignore
    this.idDelete = drugOfBillId;
  }
}
