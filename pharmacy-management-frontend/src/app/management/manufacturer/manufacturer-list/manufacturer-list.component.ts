import {Component, OnInit} from '@angular/core';
import {MatDialog} from "@angular/material/dialog";
import {ManufacturerUpdateComponent} from "../manufacturer-update/manufacturer-update.component";
import {ManufacturerDeleteComponent} from "../manufacturer-delete/manufacturer-delete.component";
import {ManufacturerService} from "../../../service/manufacturer.service";

// @ts-ignore
import styled from 'styled-components'

@Component({
  selector: 'app-manufacturer-list',
  templateUrl: './manufacturer-list.component.html',
  styleUrls: ['./manufacturer-list.component.css']
})
export class ManufacturerListComponent implements OnInit {
  manufacturers: Array<any>;
  page: number = 0;
  pages: Array<number>;
  name: string = "";
  address: string = "";
  search: any;
  selects: any;
  sort: any;
  max: number;
  idDialog: any;
  nameDialog: any;


  constructor(private dialog: MatDialog, private manufacturerService: ManufacturerService) {

  }

  ngOnInit(): void {
    this.getAll()

  }

  getAll() {
    this.manufacturerService.getAll(this.page, this.search, this.selects, this.sort).subscribe(manufacturer => {
      this.manufacturers = manufacturer['content'];
      this.pages = new Array(manufacturer['totalPages']);
      console.log(this.manufacturers)


    });
  }

  openDialogUpdate(): void {
    const id = this.idDialog;
    const name = this.nameDialog;
    let dialogRef = this.dialog.open(ManufacturerUpdateComponent, {
        data: {id, name}
      }
    );
    dialogRef.afterClosed().subscribe(() => {
      this.getAll()
    });
  }

  openDialogDelete(): void {
    const id = this.idDialog;
    const name = this.nameDialog;
    let dialogRef = this.dialog.open(ManufacturerDeleteComponent, {
        data: {id, name}
      }
    );
    dialogRef.afterClosed().subscribe(() => {
      this.getAll()
    });
  }

  previous() {

    if (this.page <= 0) {
      alert("không tìm thấy trang")
    } else {
      this.page = this.page - 1;
      this.getAll();
    }
  }

  next() {

    this.max = this.pages.length;
    if (this.page + 2 > this.max) {
      alert("không tìm thấy trang")
    } else {
      this.page = this.page + 1;
      this.getAll();
    }
  }


  setPage(i: number) {
    this.page = i;
    this.getAll();
  }

  searchManufacturer() {
    this.getAll();
  }

  sortManufacturer() {
    this.getAll();
  }

  getId(manufacturerId: any, manufacturerName: any) {
    this.idDialog = manufacturerId;
    this.nameDialog = manufacturerName;
  }
}
