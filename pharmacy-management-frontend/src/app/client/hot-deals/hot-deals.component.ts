import { Component, OnInit } from '@angular/core';
import {DrugClientService} from '../../service/drug-client.service';
import {Drug} from '../../model/drug';

@Component({
  selector: 'app-hot-deals',
  templateUrl: './hot-deals.component.html',
  styleUrls: ['./hot-deals.component.css']
})
export class HotDealsComponent implements OnInit {
  drugs: Drug[] = [];

  constructor(private drugService: DrugClientService) { }

  ngOnInit(): void {
    this.drugService.getAll().subscribe(next => {
      this.drugs = next;
      this.sortDrugPriceAsc();
    });
  }

  sortDrugPriceAsc() {
    this.drugs = this.drugs.sort((n1, n2) => {
      if (n1.wholesalePrice < n2.wholesalePrice) {
        return -1;
      }

      if (n1.wholesalePrice > n2.wholesalePrice) {
        return 1;
      }

      return 0;
    });
  }
}
