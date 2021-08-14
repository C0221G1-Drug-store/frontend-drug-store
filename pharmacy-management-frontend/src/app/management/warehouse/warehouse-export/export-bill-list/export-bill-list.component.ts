import { Component, OnInit } from '@angular/core';
import {ExportBill} from "../model/export-bill";
import {ExportBillServiceService} from "../service/export-bill-service.service";
import DateTimeFormat = Intl.DateTimeFormat;
import {DatePipe} from "@angular/common";

@Component({
  selector: 'app-export-bill-list',
  templateUrl: './export-bill-list.component.html',
  styleUrls: ['./export-bill-list.component.css']
})
export class ExportBillListComponent implements OnInit {

  exportBillList: ExportBill[] = [];
  data: Object;

  constructor(private exportBillService: ExportBillServiceService) { }

  ngOnInit(): void {
    this.getAllRecord();
  }

  getAllRecord() {
    this.exportBillService.getAllCaseRecord().subscribe(exportBills => {
      this.data = Object.values(exportBills);
      console.log(this.data);
      this.exportBillList = this.data[0];
    });
  }

}
