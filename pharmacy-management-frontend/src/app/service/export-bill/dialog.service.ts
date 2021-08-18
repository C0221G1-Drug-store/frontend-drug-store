import { Injectable } from '@angular/core';
import {MatDialog} from '@angular/material/dialog';
import {DialogComponent} from '../../management/warehouse/warehouse-export/dialog/dialog.component';

@Injectable({
  providedIn: 'root'
})
export class DialogService {

  constructor(private dialog: MatDialog) { }

  openConfirm(msg) {
    return  this.dialog.open(DialogComponent, {
      width: '390px',
      panelClass: 'confirm-dialog-container',
      disableClose: true,
      position: {top: "10px"},
      data: {
        message: msg,
      }
    })
  };
}
