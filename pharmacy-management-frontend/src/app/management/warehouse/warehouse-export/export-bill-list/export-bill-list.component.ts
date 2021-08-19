import { Component, OnInit } from '@angular/core';
import {ExportBill} from '../../../../model/export-bill/export-bill';
import {ExportBillServiceService} from '../../../../service/export-bill/export-bill-service.service';
import {Observable} from 'rxjs';
import {ExportBillDeleteComponent} from '../export-bill-delete/export-bill-delete.component';
import {MatDialog} from '@angular/material/dialog';

@Component({
  selector: 'app-export-bill-list',
  templateUrl: './export-bill-list.component.html',
  styleUrls: ['./export-bill-list.component.css']
})
export class ExportBillListComponent implements OnInit {

  exportBillList: ExportBill[] = [];
  selectList: number[] = [];
  // tslint:disable-next-line:ban-types
  data: Object;
  private idDialog: number;
  private nameDialog: string;
  page: number;
  max: any;
  pages: Array<number>;

  constructor(private exportBillService: ExportBillServiceService, private dialog: MatDialog) { }

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
    this.exportBillService.getCaseRecordByFields(field1, field2, field3, field4, field5, this.page).subscribe(exportBills => {
      this.data = Object.values(exportBills);
      console.log(this.data);
      this.exportBillList = this.data[0];
    });
  }

  openDialogDelete(): void {
    const id = this.idDialog;
    const name = this.nameDialog;
    const dialogRef = this.dialog.open( ExportBillDeleteComponent , {
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


}
