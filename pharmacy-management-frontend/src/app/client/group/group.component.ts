import { Component, OnInit } from '@angular/core';
import {Drug} from '../../model/drug';
import {DrugService} from '../../service/drug.service';
import {ActivatedRoute, Router} from '@angular/router';

@Component({
  selector: 'app-group',
  templateUrl: './group.component.html',
  styleUrls: ['./group.component.css']
})
export class GroupComponent implements OnInit {
  drugs: Drug[] = [];

  constructor(private drugService: DrugService, private router: Router, private activatedRouter: ActivatedRoute) { }

  ngOnInit(): void {
  }

}
