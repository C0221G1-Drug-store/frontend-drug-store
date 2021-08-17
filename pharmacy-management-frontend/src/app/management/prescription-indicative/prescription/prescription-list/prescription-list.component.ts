import {Component, OnInit} from '@angular/core';
import {Prescription} from '../../../../model/prescription';
import {PrescriptionService} from '../../../../service/prescription.service';

@Component({
  selector: 'app-prescription-list',
  templateUrl: './prescription-list.component.html',
  styleUrls: ['./prescription-list.component.css']
})
export class PrescriptionListComponent implements OnInit {
  idEdit: number;
  prescriptions: Prescription[];
  pages: Array<any>;
  page = 0;
  constructor(private prescriptionService: PrescriptionService) {
  }

  ngOnInit(): void {
    this.getPrescriptions();
  }

  getPrescriptions() {
    this.prescriptionService.getAllPrescription(this.page).subscribe(prescriptions => {
      this.prescriptions = prescriptions['content'];
      this.pages = new Array<any>(prescriptions['totalPages']);
    });
  }

  getId(prescriptionId: number) {
    this.idEdit = prescriptionId;
    console.log(this.idEdit);
  }

  setPage(i: number) {
    this.page = i;
    this.getPrescriptions();

  }

  previous() {
    if (this.page === 0) {
      alert('Khong tim thay trang');
    } else {
      this.page = this.page - 1;
      this.getPrescriptions();
    }
  }

  next() {
    if (this.page > this.pages.length - 2) {
      alert('ko tim thay trang');
    } else {
      this.page = this.page + 1;
      this.getPrescriptions();
    }
  }
}
