import {Component, OnInit} from '@angular/core';
import {Prescription} from '../../../../model/prescription';
import {PrescriptionService} from '../../../../service/prescription.service';
import {MatDialog} from '@angular/material/dialog';
import {PrescriptionDeleteComponent} from '../prescription-delete/prescription-delete.component';
import {PrescriptionEditComponent} from '../prescription-edit/prescription-edit.component';


@Component({
  selector: 'app-prescription-list',
  templateUrl: './prescription-list.component.html',
  styleUrls: ['./prescription-list.component.css']
})
export class PrescriptionListComponent implements OnInit {
  idEdit: number;
  prescriptions: Prescription[];
  pages: Array<any>;
  prescription: Prescription;
  prescriptionName = '';
  prescriptionCode = '';
  object = '';
  page = 0;
  symptom = '';
  sortBy = 'prescription_id';
  select: any;
  valueSearch: any;
  idDialog: number;


  constructor(private prescriptionService: PrescriptionService,
              public dialog: MatDialog) {
  }

  ngOnInit(): void {
    this.getPrescriptions();
  }

  getPrescriptions() {
    // tslint:disable-next-line:max-line-length
    this.prescriptionService.getAllPrescription(this.prescriptionName, this.prescriptionCode, this.object, this.symptom, this.page, this.sortBy).subscribe(prescriptions => {
      this.prescriptions = prescriptions['content'];
      this.pages = new Array<any>(prescriptions['totalPages']);
      // console.log(this.pages);
    });
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

  getPres(p: Prescription) {
    this.prescription = p;
  }
  onDeleteHandler(prescription: Prescription): void {
    const dialogRef = this.dialog.open(PrescriptionDeleteComponent, {
      width: '250px',
      data: prescription
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      if (result) {
        this.prescriptionService.deletePrescription(prescription.prescriptionId).subscribe(next => {
          this.getPrescriptions();
        });
      }
    });
  }
  onEditHandler() {
    const  id = this.idEdit;
    const dialogRef = this.dialog.open(PrescriptionEditComponent, {
      data: {id}
    });
    dialogRef.afterClosed().subscribe(result => {
    });
  }

  getId(prescriptionId: number) {
    this.idEdit = prescriptionId;
    console.log(this.idEdit);
  }


  search() {
    switch (this.select) {
      case 'tenThuoc':
        this.prescriptionName = this.valueSearch;
        this.getPrescriptions();
        break;
      case 'maToaThuoc':
        this.prescriptionName = '';
        this.prescriptionCode = this.valueSearch;
        this.getPrescriptions();
        break;
      case 'doiTuong':
        this.prescriptionCode = '';
        this.object = this.valueSearch;
        this.getPrescriptions();
        break;
      case 'trieuChung':
        this.object = '';
        this.symptom = this.valueSearch;
        this.getPrescriptions();
        break;
    }
  }
}
