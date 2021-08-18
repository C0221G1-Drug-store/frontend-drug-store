import {Component, Inject, OnInit} from '@angular/core';
import {PrescriptionService} from '../../../../service/prescription.service';
import {FormArray, FormBuilder, FormControl, FormGroup} from '@angular/forms';
import {IndicativeService} from '../../../../service/indicative.service';
import {Router} from '@angular/router';
import {MAT_DIALOG_DATA} from '@angular/material/dialog';
import {Prescription} from '../../../../model/prescription';

@Component({
  selector: 'app-prescription-edit',
  templateUrl: './prescription-edit.component.html',
  styleUrls: ['./prescription-edit.component.css']
})
export class PrescriptionEditComponent implements OnInit {
  idEdit: number;
  drugs = ['Aspirin', 'Panadol', 'Ampicilin'];
  prescription: Prescription;

  constructor(private prescriptionService: PrescriptionService,
              private fb: FormBuilder,
              private indicativeService: IndicativeService,
              private router: Router,
              @Inject(MAT_DIALOG_DATA) public data: any) {
    this.ngOnInit();
  }

  prescriptionForm: FormGroup = new FormGroup({});

  ngOnInit(): void {
    this.prescriptionService.findById(this.data.id).subscribe(prescriptions => {
      console.log('log');
      console.log(this.data.id);
      this.prescription = prescriptions;
      console.log('obj');
      console.log(this.prescriptionForm);
      this.prescriptionForm.patchValue(this.prescription);
    });
    this.prescriptionForm = new FormGroup({
      prescriptionId: new FormControl(''),
      prescriptionCode: new FormControl(''),
      prescriptionName: new FormControl(''),
      symptom: new FormControl(''),
      object: new FormControl(''),
      numberOfDay: new FormControl(''),
      note: new FormControl(''),
      indicatives: this.fb.array([this.fb.group({
        indicativeId: new FormControl(''),
        drug: new FormControl(''),
        totalPill: new FormControl(''),
        drinkDay: new FormControl(''),
        drinkTime: new FormControl('')
      })])
    });
  }

  get indicatives() {
    return this.prescriptionForm.get('indicatives') as FormArray;
  }

  addIndicative() {
    this.indicatives.push(this.fb.group({
      drug: '',
      totalPill: '',
      drinkDay: '',
      drinkTime: ''
    }));
  }

  deleteIndicative(index) {
    this.indicatives.removeAt(index);
  }

  submit() {
    const prescription = this.prescriptionForm.value;
    this.prescriptionService.updatePrescription(this.data.id, prescription).subscribe(() => {
        this.prescriptionForm.reset();
        this.router.navigateByUrl('/prescription/prescription-list');
        alert(' Thêm mới thành công ! ');
      }, e => {
        alert(' Thêm mới thất bại !');
      }
    );
  }
}
