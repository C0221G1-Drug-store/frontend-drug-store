import { Component, OnInit } from '@angular/core';
import {DrugGroup} from '../../model/drug-group';
import {DrugGroupClientService} from '../../service/drug-group-client.service';
import {ActivatedRoute, Router} from '@angular/router';

@Component({
  selector: 'app-header-client',
  templateUrl: './header-client.component.html',
  styleUrls: ['./header-client.component.css']
})
export class HeaderClientComponent implements OnInit {
  drugGroups: DrugGroup[] = [];
  search: any;
  constructor(private drugGroupService: DrugGroupClientService, private router: Router, private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.getAllDrugGroup();
  }

  getAllDrugGroup() {
    this.drugGroupService.getAll().subscribe(next => {
      this.drugGroups = next;
    });
  }

  pressEnter($event: any) {
    this.router.navigate(['search', this.search], { relativeTo: this.route });
  }
}
