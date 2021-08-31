import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, NavigationExtras, Router} from '@angular/router';
import {FormGroup} from '@angular/forms';
import {MatDialog} from '@angular/material/dialog';
import {DrugService} from '../../../service/drug.service';
import {PrescriptionService} from '../../../service/prescription.service';
import {Drug} from '../../../model/drug';
import {Prescription} from '../../../model/prescription';
import {DeleteComponent} from '../delete/delete.component';
import {Indicative} from '../../../model/indicative';

@Component({
  selector: 'app-prescription-detail',
  templateUrl: './prescription-detail.component.html',
  styleUrls: ['./prescription-detail.component.css']
})
export class PrescriptionDetailComponent implements OnInit {
  drugs: Drug[] = [];
  indicatives: Indicative[];
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

  openDeleteDialog(drugOfBill) {
    const dialog = this.dialog.open(DeleteComponent , {
      height: '250px' , width: '300px',
      data: [this.indicatives,  {drugOfBill}]
    });
    console.log(drugOfBill);
  }
  getAll() {
    this.drugService.getAll().subscribe(next => {
      this.drugs = next;
    });
  }
  getDrugOfBills() {
    this.prescriptionService.findAll(this.id).subscribe(next => {
      this.indicatives = next;
      console.log(next);
    });
    console.log(this.indicatives);
  }
  getPrescription() {
    this.prescriptionService.findPrescriptionById(this.id).subscribe( next => {
      this.prescription = next;
    });
  }

  addToBill(indicatives) {
    const navigationExtras: NavigationExtras = {state: {data: indicatives}};
    this.router.navigate(['/sale'] , navigationExtras);
  }

  sendData() {

  }

}
