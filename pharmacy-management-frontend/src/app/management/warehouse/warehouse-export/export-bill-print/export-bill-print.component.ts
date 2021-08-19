import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";

@Component({
  selector: 'app-export-bill-print',
  templateUrl: './export-bill-print.component.html',
  styleUrls: ['./export-bill-print.component.css']
})
export class ExportBillPrintComponent implements OnInit {

  message: string;

  constructor(public dialogRef: MatDialogRef<ExportBillPrintComponent>,  @Inject(MAT_DIALOG_DATA) public data: any) { }

  ngOnInit(): void {
    if (this.data == null) {
      this.message = 'chưa nhận được hóa đơn';
    }
  }

  print() {
    this.dialogRef.close(true);
    window.print();
  }

}
