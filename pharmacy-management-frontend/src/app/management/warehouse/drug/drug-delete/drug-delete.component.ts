import {Component, Inject, OnInit} from '@angular/core';
import {DrugService} from '../../../../service/drug.service';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';

@Component({
  selector: 'app-drug-delete',
  templateUrl: './drug-delete.component.html',
  styleUrls: ['./drug-delete.component.css']
})
export class DrugDeleteComponent implements OnInit {
  drugId;
  drugCode;
  constructor(private drugService: DrugService,
              private dialogRef: MatDialogRef<DrugDeleteComponent>,
              @Inject(MAT_DIALOG_DATA) public data: any) { }

  ngOnInit(): void {
    this.drugId = this.data.data1.drugId;
    this.drugCode = this.data.data1.drugCode;
    console.log(this.drugId);
  }
  onNoClick(): void {
    this.dialogRef.close();
  }
  delete() {
    this.drugService.deleteDrug(this.drugId).subscribe(data => {
      this.dialogRef.close();
    });
  }
}
