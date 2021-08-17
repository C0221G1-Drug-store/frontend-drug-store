import { Component, OnInit } from '@angular/core';
import {DrugGroup} from '../../model/drug-group';
import {DrugGroupClientService} from '../../service/drug-group-client.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-footer-client',
  templateUrl: './footer-client.component.html',
  styleUrls: ['./footer-client.component.css']
})
export class FooterClientComponent implements OnInit {
  drugGroups: DrugGroup[] = [];
  constructor(private drugGroupService: DrugGroupClientService, private router: Router) { }

  ngOnInit(): void {
    this.getAllDrugGroup();
  }

  getAllDrugGroup() {
    this.drugGroupService.getAll().subscribe(next => {
      this.drugGroups = next;
    });
  }
}
