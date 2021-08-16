import { Component, OnInit } from '@angular/core';
import {DrugGroup} from '../../model/drug-group';
import {DrugGroupService} from '../../service/drug-group.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-header-client',
  templateUrl: './header-client.component.html',
  styleUrls: ['./header-client.component.css']
})
export class HeaderClientComponent implements OnInit {
  drugGroups: DrugGroup[] = [];
  search: any;
  constructor(private drugGroupService: DrugGroupService, private router: Router) { }

  ngOnInit(): void {
    this.getAllDrugGroup();
  }

  getAllDrugGroup() {
    this.drugGroupService.getAll().subscribe(next => {
      this.drugGroups = next;
    });
  }
}
