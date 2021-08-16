import {Component, OnInit} from '@angular/core';
import {Prescription} from '../../../../model/prescription';
import {PrescriptionService} from '../../../../service/prescription.service';

@Component({
  selector: 'app-prescription-list',
  templateUrl: './prescription-list.component.html',
  styleUrls: ['./prescription-list.component.css']
})
export class PrescriptionListComponent implements OnInit {
  page: any;
  prescriptions: Prescription[];

  constructor(private prescriptionService: PrescriptionService) {
  }

  ngOnInit(): void {
    this.getPrescriptions();
  }

  getPrescriptions() {
    this.prescriptionService.getAllPrescription().subscribe(prescriptions => {
      this.prescriptions = prescriptions;
    });
  }
}
