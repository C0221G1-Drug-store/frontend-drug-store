import {Component, OnInit} from '@angular/core';
import {Drug} from '../../model/drug';
import {DrugClientService} from '../../service/drug-client.service';
import {ActivatedRoute, ParamMap, Route, Router} from '@angular/router';

@Component({
  selector: 'app-search-page',
  templateUrl: './search-page.component.html',
  styleUrls: ['./search-page.component.css']
})
export class SearchPageComponent implements OnInit {
  drugs: Drug[] = [];
  search?: any;
  isNameAscending = true;
  toggleBooleanPrice = true;
  toggleBooleanAmount = true;

  constructor(private drugService: DrugClientService, private router: Router, private activatedRouter: ActivatedRoute) {
  }

  ngOnInit(): void {
    this.activatedRouter.paramMap.subscribe((paramMap: ParamMap) => {
      this.search = paramMap.get('search');
      this.drugService.searchDrug(this.search).subscribe(next => {
        this.drugs = next;
      });
    });
  }

  sortDrugByName() {
    this.isNameAscending = !this.isNameAscending;
    this.drugs.sort((drug1: any, drug2: any) => this.compareDrugName(drug1, drug2));
  }

  compareDrugName(drug1: any, drug2: any): number {
    let compValue = 0;
    compValue = drug1.drugName.localeCompare(drug2.drugName, 'en', {
      sensitivity: 'base'
    });
    console.log(compValue);
    if (!this.isNameAscending) {
      compValue = compValue * -1;
    }
    return compValue;
  }

  sortDrugPriceDesc() {
    this.drugs = this.drugs.sort((n1, n2) => {
      if (n1.wholesalePrice < n2.wholesalePrice) {
        this.toggleBooleanPrice = true;
        return 1;
      }

      if (n1.wholesalePrice > n2.wholesalePrice) {
        this.toggleBooleanPrice = true;
        return -1;
      }
      this.toggleBooleanPrice = true;
      return 0;
    });
  }

  sortDrugPriceAsc() {
    this.drugs = this.drugs.sort((n1, n2) => {
      if (n1.wholesalePrice < n2.wholesalePrice) {
        this.toggleBooleanPrice = false;
        return -1;
      }

      if (n1.wholesalePrice > n2.wholesalePrice) {
        this.toggleBooleanPrice = false;
        return 1;
      }
      this.toggleBooleanPrice = false;
      return 0;
    });
  }

  sortDrugAmountDesc() {
    this.drugs = this.drugs.sort((n1, n2) => {
      if (n1.drugAmount < n2.drugAmount) {
        this.toggleBooleanAmount = true;
        return 1;
      }

      if (n1.drugAmount > n2.drugAmount) {
        this.toggleBooleanAmount = true;
        return -1;
      }
      this.toggleBooleanAmount = true;
      return 0;
    });
  }

  sortDrugAmountAsc() {
    this.drugs = this.drugs.sort((n1, n2) => {
      if (n1.drugAmount < n2.drugAmount) {
        this.toggleBooleanAmount = false;
        return -1;
      }

      if (n1.drugAmount > n2.drugAmount) {
        this.toggleBooleanAmount = false;
        return 1;
      }
      this.toggleBooleanAmount = false;
      return 0;
    });
  }
}
