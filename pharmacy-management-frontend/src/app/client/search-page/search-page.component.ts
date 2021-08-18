import { Component, OnInit } from '@angular/core';
import {Drug} from '../../model/drug';
import {DrugService} from '../../service/drug.service';
import {ActivatedRoute, ParamMap, Route, Router} from '@angular/router';

@Component({
  selector: 'app-search-page',
  templateUrl: './search-page.component.html',
  styleUrls: ['./search-page.component.css']
})
export class SearchPageComponent implements OnInit {
  drugs: Drug[] = [];
  search?: any;

  constructor(private drugService: DrugService, private router: Router, private activatedRouter: ActivatedRoute) { }

  ngOnInit(): void {
    this.activatedRouter.paramMap.subscribe((paramMap: ParamMap) => {
      this.search = paramMap.get('search');
      this.drugService.searchDrug(this.search).subscribe(next => {
        this.drugs = next;
      });
    });
  }
}
