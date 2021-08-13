import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, NavigationExtras, Router} from '@angular/router';
import {FormGroup} from '@angular/forms';
import {MatDialog} from '@angular/material/dialog';
import {DrugService} from '../../../service/drug.service';
import {PrescriptionService} from '../../../service/prescription.service';
import {Drug} from '../../../model/drug';
import {Prescription} from '../../../model/prescription';

@Component({
  selector: 'app-prescription-detail',
  templateUrl: './prescription-detail.component.html',
  styleUrls: ['./prescription-detail.component.css']
})
export class PrescriptionDetailComponent implements OnInit {
  drugs: Drug[] = [];
  drugOfbills: [];
  id: number;
  prescription: Prescription;
  fromPrescription: FormGroup;

  constructor(public dialog: MatDialog,
              private drugService: DrugService,
              private activatedRoute: ActivatedRoute,
              private prescriptionService: PrescriptionService,
              private router: Router
  ) {
    this.fromPrescription = new FormGroup({

    });
    activatedRoute.paramMap.subscribe((param ) => {
      // tslint:disable-next-line:radix
      this.id = parseInt(param.get('id'));
    });
  }

  ngOnInit(): void {
    this.getAll();
    this.getDrugOfBills();
    this.getPrescription();
  }

  openDeleteDialog() {
    // const dialog = this.dialog.open(DeleteDialogComponent , {
    //   height: '250px' , width: '300px',
    //   data: {}
    // });
  }
  getAll() {
    this.drugService.getAll().subscribe(next => {
      this.drugs = next;
    });
  }
  getDrugOfBills() {
    this.prescriptionService.findAll(this.id).subscribe(next => {
      this.drugOfbills = next;
    });
  }
  getPrescription() {
    this.prescriptionService.findPrescriptionById(this.id).subscribe( next => {
      this.prescription = next;
    });
    console.log(this.prescription);
  }

  addToBill(drugOfBills) {
    const navigationExtras: NavigationExtras = {state: {data: drugOfBills}};
    this.router.navigate(['/sale'] , navigationExtras);
  }

  sendData() {

  }

}
