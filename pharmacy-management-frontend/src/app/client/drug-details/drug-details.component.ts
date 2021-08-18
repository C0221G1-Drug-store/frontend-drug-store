import { Component, OnInit } from '@angular/core';
import {DrugService} from '../../service/drug.service';
import {Drug} from '../../model/drug';
import {ActivatedRoute} from '@angular/router';

var today=new Date();
@Component({
  selector: 'app-drug-details',
  templateUrl: './drug-details.component.html',
  styleUrls: ['./drug-details.component.css']
})
export class DrugDetailsComponent implements OnInit {
  drug:Drug;
  date=today.getDate()+"/"+(today.getMonth()+1);
  constructor(
    private drugService:DrugService,
    private router:ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.router.paramMap.subscribe(data=>{
      const id=data.get('id');
      this.getDrug(id);
    })
  }

  getDrug(id){
    this.drugService.findById(id).subscribe(data=>{
      this.drug=data;
    })
  }
}
