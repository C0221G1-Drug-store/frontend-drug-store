import {Component, OnInit} from '@angular/core';
import {DrugGroup} from '../../model/drug-group';
import {DrugGroupService} from '../../service/drug-group.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-footer-client',
  templateUrl: './footer-client.component.html',
  styleUrls: ['./footer-client.component.css']
})
export class FooterClientComponent implements OnInit {
  drugGroups: DrugGroup[] = [];
  displayFlat: boolean = false;

  constructor(private drugGroupService: DrugGroupService, private router: Router) {
  }

  ngOnInit(): void {
    // this.getAllDrugGroup();
  }

  // getAllDrugGroup() {
  //   this.drugGroupService.getAll().subscribe(next => {
  //     this.drugGroups = next;
  //   });
  // }

  controlInbox() {
    if (this.displayFlat) {
      this.displayFlat = false;
    } else {
      this.displayFlat = true;
    }
  }

  closeBox(e:boolean) {
    this.displayFlat=e;
  }
}
