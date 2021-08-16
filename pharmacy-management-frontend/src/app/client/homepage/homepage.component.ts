import { Component, OnInit } from '@angular/core';
import {Drug} from '../../model/drug';
import {DrugGroup} from '../../model/drug-group';
import {DrugService} from '../../service/drug.service';
import {DrugGroupService} from '../../service/drug-group.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-homepage',
  templateUrl: './homepage.component.html',
  styleUrls: ['./homepage.component.css']
})
export class HomepageComponent implements OnInit {
  drugs: Drug[] = [];
  drugGroups: DrugGroup[] = [];
  config: any;
  data = '';

  constructor(private drugService: DrugService, private drugGroupService: DrugGroupService, private router: Router) {
    this.config = {
      itemsPerPage: 3,
      currentPage: 1
    };
    const state = this.router.getCurrentNavigation().extras.state as {data: string};
    if (state != null) {
      this.data = state.data;
    }
  }

  ngOnInit(): void {
    this.getAllDrugGroup();
    this.getAllDrug();
  }

  getAllDrug() {
    this.drugService.getAll().subscribe(next => {
      this.drugs = next;
    });
  }

  getAllDrugGroup() {
    this.drugGroupService.getAll().subscribe(next => {
      this.drugGroups = next;
    });
  }
}
