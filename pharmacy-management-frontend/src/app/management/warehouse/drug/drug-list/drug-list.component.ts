import {Component, OnInit} from '@angular/core';
import {DrugService} from '../../../../service/drug.service';
import {DrugDTO} from '../../../../model/DrugDTO';

@Component({
  selector: 'app-drug-list',
  templateUrl: './drug-list.component.html',
  styleUrls: ['./drug-list.component.css']
})
export class DrugListComponent implements OnInit {
  drugs: DrugDTO[];
  drugsNotPagination: DrugDTO[];
  indexPagination: number = 1;
  totalPagination: number;

  constructor(private drugService: DrugService) {
  }

  ngOnInit(): void {
    this.getAllPagination(0);
    this.drugService.getAll().subscribe((drugs: DrugDTO[]) => {
      this.drugsNotPagination = drugs;
      if ((this.drugsNotPagination.length % 2) === 0) {
        this.totalPagination = this.drugsNotPagination.length / 2;
      } else {
        this.totalPagination = (Math.floor(this.drugsNotPagination.length / 2)) + 1;
      }
    });
  }

  nextPage() {
    this.indexPagination = this.indexPagination + 1;
    if (this.indexPagination > this.totalPagination) {
      this.indexPagination = this.indexPagination - 1;
    }
    this.drugService.getAllPagination((this.indexPagination * 2) - 2).subscribe((drugs: DrugDTO[]) => {
      this.drugs = drugs;
    });
  }

  previousPage() {
    this.indexPagination = this.indexPagination - 1;
    if (this.indexPagination === 0) {
      this.indexPagination = 1;
      this.ngOnInit();
    } else {
      this.drugService.getAllPagination((this.indexPagination * 2) - 2).subscribe((drugs: DrugDTO[]) => {
        this.drugs = drugs;
      });
    }
  }
  findPagination() {
  }

  indexPaginationChange() {
  }

  getAllPagination(index: number) {
    this.drugService.getAllPagination(index).subscribe((drugs: DrugDTO[]) => {
      this.drugs = drugs;
    });
  }
}
