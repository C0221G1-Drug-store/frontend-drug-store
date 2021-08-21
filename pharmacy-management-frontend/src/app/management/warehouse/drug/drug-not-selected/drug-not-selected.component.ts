import { Component, OnInit } from '@angular/core';
import {MatDialogRef} from '@angular/material/dialog';

@Component({
  selector: 'app-drug-not-selected',
  templateUrl: './drug-not-selected.component.html',
  styleUrls: ['./drug-not-selected.component.css']
})
export class DrugNotSelectedComponent implements OnInit {

  constructor(  private dialogRef: MatDialogRef<DrugNotSelectedComponent>) { }

  ngOnInit(): void {
  }
  onNoClick(): void {
    this.dialogRef.close();
  }
}
