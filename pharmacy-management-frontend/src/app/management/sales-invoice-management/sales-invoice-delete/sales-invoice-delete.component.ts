import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {BillSale} from "../../../model/bill-sale";

@Component({
  selector: 'app-sales-invoice-delete',
  templateUrl: './sales-invoice-delete.component.html',
  styleUrls: ['./sales-invoice-delete.component.css']
})
export class SalesInvoiceDeleteComponent implements OnInit {
  billSale: BillSale;
  constructor(public dialogRef: MatDialogRef<SalesInvoiceDeleteComponent>,  @Inject(MAT_DIALOG_DATA) public data: any) { }

  ngOnInit(): void {
    this.billSale = this.data;
  }

}
