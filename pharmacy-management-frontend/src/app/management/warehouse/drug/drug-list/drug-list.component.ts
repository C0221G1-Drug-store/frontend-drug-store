import { Component, OnInit } from '@angular/core';
import {DrugService} from '../../../../service/drug.service';

@Component({
  selector: 'app-drug-list',
  templateUrl: './drug-list.component.html',
  styleUrls: ['./drug-list.component.css']
})
export class DrugListComponent implements OnInit {
  drugs;

  constructor(private drugService: DrugService) {
  }

  ngOnInit(): void {
    this.getAll(0);
  }

  getAll(index: number) {
    this.drugService.getAll(index).subscribe(drugs => {
      this.drugs = drugs;
    });
  }
}
