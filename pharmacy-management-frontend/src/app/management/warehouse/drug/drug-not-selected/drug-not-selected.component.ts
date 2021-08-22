import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';

@Component({
  selector: 'app-drug-not-selected',
  templateUrl: './drug-not-selected.component.html',
  styleUrls: ['./drug-not-selected.component.css']
})
export class DrugNotSelectedComponent implements OnInit {
  selected = false;
  notFound = false;
  constructor(  private dialogRef: MatDialogRef<DrugNotSelectedComponent>,
                @Inject(MAT_DIALOG_DATA) public data: any) { }

  ngOnInit(): void {
    this.selected = this.data.data1;
    this.notFound = this.data.data2;
  }
  onNoClick(): void {
    this.dialogRef.close();
  }
}
