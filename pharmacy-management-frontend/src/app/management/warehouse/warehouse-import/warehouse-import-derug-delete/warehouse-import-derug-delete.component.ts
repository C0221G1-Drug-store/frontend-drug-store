import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import {ImportBillServiceService} from '../service/import-bill-service.service';

@Component({
  selector: 'app-warehouse-import-derug-delete',
  templateUrl: './warehouse-import-derug-delete.component.html',
  styleUrls: ['./warehouse-import-derug-delete.component.css']
})
export class WarehouseImportDerugDeleteComponent implements OnInit {
  public code;
  public id;

  constructor(private importBillServiceService: ImportBillServiceService,
              public dialogRef: MatDialogRef<WarehouseImportDerugDeleteComponent>, @Inject(MAT_DIALOG_DATA) public data: any) {
  }

  ngOnInit(): void {
    this.code = this.data.name;
    this.id = this.data.id;
  }

  deleteBill() {
    console.log(this.id)
    this.importBillServiceService.deleteBill(this.id).subscribe(data => {
      this.dialogRef.close();
    }, e => console.log(e));
    alert("xóa thành công")
  }
}


