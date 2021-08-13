import { Component, OnInit } from '@angular/core';
import {ManufacturerDeleteComponent} from "../manufacturer-delete/manufacturer-delete.component";
import {MatDialog} from "@angular/material/dialog";
import {ImportBillShowComponent} from "../import-bill-show/import-bill-show.component";

@Component({
  selector: 'app-manufacturer-show',
  templateUrl: './manufacturer-show.component.html',
  styleUrls: ['./manufacturer-show.component.css']
})
export class ManufacturerShowComponent implements OnInit {

  constructor(private dialog: MatDialog) { }

  ngOnInit(): void {
  }

  dialogShow(): void {

    let dialogRef = this.dialog.open(ImportBillShowComponent, {

    });
    dialogRef.afterClosed().subscribe(() => {

    });
  }
}
