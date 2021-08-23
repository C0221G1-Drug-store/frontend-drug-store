import { Component, OnInit } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {MatDialog} from '@angular/material/dialog';
import {ActivatedRoute, Router} from '@angular/router';
import {PrescriptionService} from '../../../service/prescription.service';
import {DrugOfBill} from '../../../model/drug-of-bill';
import {Prescription} from '../../../model/prescription';



@Component({
  selector: 'app-prescription',
  templateUrl: './prescription.component.html',
  styleUrls: ['./prescription.component.css']
})
export class PrescriptionComponent implements OnInit {
  id: number;
  drugOfBills: DrugOfBill[] = [] ;
  prescriptions: Prescription[] = [];
  constructor(private http: HttpClient,
              private prescriptionService: PrescriptionService,
              private dialog: MatDialog,
              public router: Router,
              private activatedRoute: ActivatedRoute) {
  }
  ngOnInit(): void {
    this.getAll();
  }
  getAll() {
    this.prescriptionService.getAll().subscribe(next => {
      this.prescriptions = next;
    });
    console.log(this.prescriptions);
  }


  showView(id: number) {
    this.id = id;
  }

  showDetail() {
    this.router.navigate(['/prescription-detail', this.id]);
  }


}
