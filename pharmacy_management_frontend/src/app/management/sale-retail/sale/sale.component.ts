import { Component, OnInit } from '@angular/core';
import {MatDialog} from '@angular/material/dialog';
import {Router} from '@angular/router';
import {DrugService} from '../../../service/drug.service';
import {DrugOfBill} from '../../../model/drug-of-bill';
import {Drug} from '../../../model/drug';

@Component({
  selector: 'app-sale',
  templateUrl: './sale.component.html',
  styleUrls: ['./sale.component.css']
})
export class SaleComponent implements OnInit {
  data: DrugOfBill[] = [];
  total = 0;
  drugs: Drug[] = [];
  drug = null;
  drugOfBill: DrugOfBill;

  constructor(private dialog: MatDialog,
              private router: Router,
              private drugService: DrugService) {
    const state = this.router.getCurrentNavigation().extras.state as {data};
    if (state != null) {
      this.data = state.data;
    }
    // tslint:disable-next-line:prefer-for-of
    for (let i = 0; i < this.data.length; i++) {
      this.total += this.data[i].quantity * this.data[i].drug.price;
    }
  }

  ngOnInit(): void {
    this.getAllDrug();
  }

  openDeleteDialog() {
    // const dialog = this.dialog.open(DeleteDialogComponent , {
    //   height: '250px' , width: '300px',
    //   data: {}
    // });
  }

  getAllDrug() {
    this.drugService.getAll().subscribe(next => {
      this.drugs = next;
    });
  }

  getDrug(tam) {
    this.drugOfBill = {drug: tam , quantity : 5};
    this.data.push(this.drugOfBill);
    console.log(tam.name);
    // tslint:disable-next-line:prefer-for-of
    this.total = 0;
    // tslint:disable-next-line:prefer-for-of
    for (let i = 0; i < this.data.length; i++) {
      this.total += this.data[i].quantity * this.data[i].drug.price;
    }
  }
}
