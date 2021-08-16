import {Component, OnInit} from '@angular/core';
import {MatDialog} from "@angular/material/dialog";

import {ManufacturerService} from "../../../service/manufacturer.service";
import {ActivatedRoute, ParamMap} from '@angular/router';
import {ImportBillShowComponent} from '../import-bill-show/import-bill-show.component';
import { Manufacturer } from 'src/app/model/manufacturer';
import {ImportBill} from "../../../model/import-bill";


@Component({
  selector: 'app-manufacturer-show',
  templateUrl: './manufacturer-show.component.html',
  styleUrls: ['./manufacturer-show.component.css']
})
export class ManufacturerShowComponent implements OnInit {
  id: any;
  manufacturer: Manufacturer;
  page:any=0;
  pages:Array<number>;
  max:any;
importBills: ImportBill[];
importBill: ImportBill;
idDialog: number;


  constructor(private dialog: MatDialog, private manufacturerService: ManufacturerService, private activatedRoute: ActivatedRoute) {
    activatedRoute.paramMap.subscribe((paramMap: ParamMap) => {
      this.id = paramMap.get('id');
      manufacturerService.findByIdManufacture(this.id).subscribe(data => {
        this.manufacturer = data;
      });
      this.getAllImportBill();


    });

  }
  ngOnInit(): void {

  }
  getAllImportBill(){
     this.manufacturerService.findImportBillByIdManufacturer(this.id,this.page).subscribe(data =>{
      this.importBills=data['content'];
      this.pages=new Array<number>(data['totalPages']);
    });
  }



  dialogShow(): void {

    let dialogRef = this.dialog.open(ImportBillShowComponent, {});
    dialogRef.afterClosed().subscribe(() => {

    });
  }
  previous() {

    if (this.page <= 0) {
      alert("không tìm thấy trang")
    } else {
      this.page = this.page - 1;
      this.getAllImportBill();
    }
  }

  next() {

    this.max = this.pages.length;
    if (this.page + 2 > this.max) {
      alert("không tìm thấy trang")
    } else {
      this.page = this.page + 1;
      this.getAllImportBill();
    }
  }


  setPage(i: number) {
    this.page = i;
    this.getAllImportBill();
  }
  selectedMovie: ImportBill;
  getId(importBillId: any , movie:ImportBill): void {
    this.idDialog = importBillId;
    this.selectedMovie=movie;
  }
}
