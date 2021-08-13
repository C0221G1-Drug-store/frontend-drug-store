import { Component, OnInit } from '@angular/core';
import {MatDialog} from "@angular/material/dialog";
import {ManufacturerUpdateComponent} from "../manufacturer-update/manufacturer-update.component";
import {ManufacturerDeleteComponent} from "../manufacturer-delete/manufacturer-delete.component";

@Component({
  selector: 'app-manufacturer-list',
  templateUrl: './manufacturer-list.component.html',
  styleUrls: ['./manufacturer-list.component.css']
})
export class ManufacturerListComponent implements OnInit {


  constructor(private dialog: MatDialog) { }

  ngOnInit(): void {
  }
  openDialogUpdate(): void {

    let dialogRef = this.dialog.open(ManufacturerUpdateComponent, {

    });
    dialogRef.afterClosed().subscribe(() => {

    });
  }

  openDialogDelete(): void {

    let dialogRef = this.dialog.open(ManufacturerDeleteComponent, {

    });
    dialogRef.afterClosed().subscribe(() => {

    });
  }
}
