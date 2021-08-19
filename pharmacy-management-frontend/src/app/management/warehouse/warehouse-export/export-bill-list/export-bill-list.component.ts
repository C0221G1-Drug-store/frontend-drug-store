import { Component, OnInit } from '@angular/core';

import {Observable} from 'rxjs';
import {ExportBillDeleteComponent} from '../export-bill-delete/export-bill-delete.component';
import {MatDialog} from '@angular/material/dialog';
import {ExportbillService} from '../../../../service/export-bill/exportbill.service';
import {ExportBillDetails} from '../../../../model/export-bill/exportBillDetails';
import {ExportBillPrintComponent} from "../export-bill-print/export-bill-print.component";
import {ExportBill} from "../../../../model/export-bill/exportBill";

@Component({
  selector: 'app-export-bill-list',
  templateUrl: './export-bill-list.component.html',
  styleUrls: ['./export-bill-list.component.css']
})
export class ExportBillListComponent implements OnInit {

  exportBillList: ExportBillDetails[] = [];
  selectList: number[] = [];
  // tslint:disable-next-line:ban-types
  data: Object;
  private exportBillId: number;
  private exportBillCode: string;
  page: number;
  max: any;
  pages: Array<number>;
  totalMoney = 0;
  message1: string;
  message2: string;
  message3: string;
  message4: string;

  constructor(private exportBillService: ExportbillService, private dialog: MatDialog) { }

  ngOnInit(): void {
    this.getAllRecord();
  }

  selectRecords(id: number) {
    if (!this.selectList.includes(id)) {
      this.selectList.push(id);
    } else {
      this.selectList.splice(this.selectList.indexOf(id), 1);
    }
    console.log(this.selectList);
  }

  getAllRecord() {
    this.exportBillService.getAllCaseRecord(this.page).subscribe(exportBills => {
      this.data = Object.values(exportBills);
      console.log(this.data);
      this.exportBillList = this.data[0];
    });
  }

  getCaseRecordByFields(field1: string, field2: string, field3: string, field4: string, field5: string, page: number) {
    if (field1 == null ||  field2 == null || field3 == null || field4 == null || field5 == null) {
      if (field1 == null){
        this.message1 = "ngày không được để trống";
      } else {
        this.message1 = null;
      }
      if (field2 == null){
        this.message2 = "ngày không được để trống";
      } else {
        this.message2 = null;
      }
      if (field3 == null){
        this.message3 = "giờ không được để trống";
      } else {
        this.message3 = null;
      }
      if (field4 == null){
        this.message4 = "giờ không được để trống";
      } else {
        this.message4 = null;
      }
    } else {
      this.exportBillService.getCaseRecordByFields(field1, field2, field3, field4, field5, this.page).subscribe(exportBills => {
        this.data = Object.values(exportBills);
        console.log(this.data);
        this.exportBillList = this.data[0];
      });
    }
  }

  openDialogDelete(): void {
    const id = this.exportBillId;
    const name = this.exportBillCode;
    const dialogRef = this.dialog.open( ExportBillDeleteComponent , {
        data: {id, name}
      }
    );
    dialogRef.afterClosed().subscribe(() => {
      this.getAllRecord();
    });
  }

  openDialogPrint(): void {
    const id = this.exportBillId;
    const name = this.exportBillCode;
    const dialogRef = this.dialog.open( ExportBillPrintComponent , {
      data: {id, name}
      }
    );
    dialogRef.afterClosed().subscribe(() => {
      this.getAllRecord();
    });
  }

  previous() {

    if (this.page <= 0) {
      alert('không tìm thấy trang');
    } else {
      this.page = this.page - 1;
      this.getAllRecord();
    }
  }

  next() {

    this.max = this.pages.length;
    if (this.page + 2 > this.max) {
      alert('không tìm thấy trang');
    } else {
      this.page = this.page + 1;
      this.getAllRecord();
    }
  }


  setPage(i: number) {
    this.page = i;
    this.getAllRecord();
  }

  setTotal(exportBillDetail: ExportBillDetails): number {
    if (exportBillDetail.exportBill.exportBillType.exportBillTypeId == 1){
      return (exportBillDetail.importBillDrug.importAmount * exportBillDetail.importBillDrug.importPrice) - (exportBillDetail.importBillDrug.discountRate * exportBillDetail.importBillDrug.importPrice / 100) - (exportBillDetail.importBillDrug.importAmount * exportBillDetail.importBillDrug.importPrice * exportBillDetail.importBillDrug.vat / 100);
    }
    return (exportBillDetail.importBillDrug.importAmount * exportBillDetail.importBillDrug.importPrice) - (exportBillDetail.importBillDrug.discountRate * exportBillDetail.importBillDrug.importPrice / 100);
  }


}
