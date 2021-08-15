import { Component, OnInit } from '@angular/core';
import {Router} from "@angular/router";

@Component({
  selector: 'app-export-bill-return',
  templateUrl: './export-bill-return.component.html',
  styleUrls: ['./export-bill-return.component.css']
})
export class ExportBillReturnComponent implements OnInit {

  constructor(private route: Router) { }

  ngOnInit(): void {
  }
  selectType(value: any) {
    if (value == 1) {
      this.route.navigateByUrl("/management/warehouse/warehouse-export/export-bill-destroy");
    }
    else {
      this.route.navigateByUrl("/management/warehouse/warehouse-export/export-bill-return");
    }
  }
}
