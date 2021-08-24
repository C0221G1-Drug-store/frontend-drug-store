import {Component, OnInit} from '@angular/core';
import {DrugService} from '../../../../service/drug.service';
import {DrugDTO} from '../../../../model/DrugDTO';
import {DrugDeleteComponent} from '../drug-delete/drug-delete.component';
import {MatDialog} from '@angular/material/dialog';

import {DrugNotificationComponent} from '../drug-notification/drug-notification.component';

import {DrugEditComponent} from '../drug-edit/drug-edit.component';

@Component({
  selector: 'app-drug-list',
  templateUrl: './drug-list.component.html',
  styleUrls: ['./drug-list.component.css']
})
export class DrugListComponent implements OnInit {
  drugs: DrugDTO[];
  drugsNotPagination: DrugDTO[];
  drugsSearchNotPagination: DrugDTO[];
  indexPagination: number;
  totalPagination: number;
  drugSelectedId;
  notSelected = true;
  selectedColor = '';
  field = 'drugCode';
  input = '';
  sign = 'like';
  searched = false;

  notFound = false;



  constructor(private drugService: DrugService,
              private dialog: MatDialog) {
  }

  ngOnInit(): void {
    this.getAllPagination(0);
    this.indexPagination = 1;
    this.drugService.getAll().subscribe((drugs: DrugDTO[]) => {
      this.drugsNotPagination = drugs;
      console.log(this.drugsNotPagination);
      if ((this.drugsNotPagination.length % 5) === 0) {
        this.totalPagination = this.drugsNotPagination.length / 5;
      } else {
        this.totalPagination = (Math.floor(this.drugsNotPagination.length / 5)) + 1;
      }
    });
  }

  nextPage() {
    this.indexPagination = this.indexPagination + 1;
    if (this.indexPagination > this.totalPagination) {
      this.indexPagination = this.indexPagination - 1;
    }
    if (!this.searched) {
      this.drugService.getAllPagination((this.indexPagination * 5) - 5).subscribe((drugs: DrugDTO[]) => {
        this.drugs = drugs;
      });
    } else {
      this.drugService.getAllDrugsSearch(this.field, this.sign, this.input, (this.indexPagination * 5) - 5).subscribe((drugs: DrugDTO[]) => {
        this.drugs = drugs;
      });
    }
  }

  previousPage() {
    this.indexPagination = this.indexPagination - 1;
    if (!this.searched) {
      if (this.indexPagination === 0) {
        this.indexPagination = 1;
        this.ngOnInit();
      } else {
        this.drugService.getAllPagination((this.indexPagination * 5) - 5).subscribe((drugs: DrugDTO[]) => {
          this.drugs = drugs;
        });
      }
    } else {
      if (this.indexPagination === 0) {
        this.search();
      } else {
        this.drugService.getAllDrugsSearch(this.field, this.sign, this.input, (this.indexPagination * 5) - 5).subscribe((drugs: DrugDTO[]) => {
          this.drugs = drugs;
        });
      }
    }
  }

  getAllPagination(index: number) {
    this.drugService.getAllPagination(index).subscribe((drugs: DrugDTO[]) => {
      this.drugs = drugs;
    });
  }

  getAllSearchPagination(field: string, sign: string, input: string, index: number) {
    this.drugService.getAllDrugsSearch(field, sign, input, index).subscribe((drugs: DrugDTO[]) => {
      this.drugs = drugs;
    });
  }

  deleteDialog(): void {
    this.drugService.getDrugById(this.drugSelectedId).subscribe(drug => {
      const dialogRef = this.dialog.open(DrugDeleteComponent, {
        width: '500px',
        data: {data1: drug}
      });
      dialogRef.afterClosed().subscribe(result => {
        this.ngOnInit();
        this.notSelected = true;
        this.notFound = false;
      });
    });
  }

  notificationDialog(): void {
    const dialogRef = this.dialog.open(DrugNotificationComponent, {
      width: '500px',
      data: {data1: this.notSelected, data2: this.notFound, data3: false}

    });
    dialogRef.afterClosed().subscribe(result => {
      this.notSelected = true;
    });
  }

  selectDrug(drudId) {
    if (this.drugSelectedId === drudId) {
      this.drugSelectedId = '';
      this.selectedColor = '';
      this.notSelected = true;
    } else {
      this.drugSelectedId = drudId;
      this.notSelected = false;
      this.selectedColor = '#62b8ff';
    }
  }

  search() {
    if (this.sign === 'all') {
      this.ngOnInit();
      this.notFound = false;
      this.searched = false;
    } else {
      this.getAllSearchPagination(this.field, this.sign, this.input, 0);
      this.indexPagination = 1;
      this.drugService.getAllDrugsSearchNotPagination(this.field, this.sign, this.input).subscribe((drugs: DrugDTO[]) => {
        this.drugsSearchNotPagination = drugs;
        if (this.drugsSearchNotPagination != null && (this.drugsSearchNotPagination.length % 5) === 0) {
          this.totalPagination = this.drugsSearchNotPagination.length / 5;
          this.notFound = false;
        } else if (this.drugsSearchNotPagination != null && (this.drugsSearchNotPagination.length % 5) !== 0) {
          this.totalPagination = (Math.floor(this.drugsSearchNotPagination.length / 5)) + 1;
          this.notFound = false;
        } else {
          this.totalPagination = 0;
          this.notFound = true;
          this.notSelected = false;
          this.notificationDialog();
        }
      });
      this.searched = true;
    }
  }

  updateDialog(): void {
    this.drugService.getDrugById(this.drugSelectedId).subscribe(drug => {
      const dialogRef = this.dialog.open(DrugEditComponent, {
        width: '1000px',
        height: '950px',
        data: {data1: drug}
      });
      dialogRef.afterClosed().subscribe(result => {
        console.log('The dialog was closed');
        this.ngOnInit();
      });
    });
  }

}
