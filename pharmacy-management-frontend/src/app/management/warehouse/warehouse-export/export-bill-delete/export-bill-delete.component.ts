import {Component, Inject, OnInit} from '@angular/core';
import {ExportBillServiceService} from '../service/export-bill-service.service';
import {MAT_DIALOG_DATA} from '@angular/material/dialog';

@Component({
  selector: 'app-export-bill-delete',
  templateUrl: './export-bill-delete.component.html',
  styleUrls: ['./export-bill-delete.component.css']
})
export class ExportBillDeleteComponent implements OnInit {

  constructor(private exportBillService: ExportBillServiceService, @Inject(MAT_DIALOG_DATA) public data) { }

  ngOnInit(): void {
  }

  delete(id: number) {
    this.exportBillService.delete(id);
    console.log(id);
  }

}
