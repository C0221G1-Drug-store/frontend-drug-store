import {Component, Inject, OnInit} from '@angular/core';
import {PrescriptionService} from '../../../../service/prescription.service';
import {FormArray, FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {IndicativeService} from '../../../../service/indicative.service';
import {Router} from '@angular/router';
import {MAT_DIALOG_DATA} from '@angular/material/dialog';
import {PrescriptionDto} from '../../../../model/prescriptionDto';
import {Indicative} from '../../../../model/indicative';

@Component({
  selector: 'app-prescription-edit',
  templateUrl: './prescription-edit.component.html',
  styleUrls: ['./prescription-edit.component.css']
})
export class PrescriptionEditComponent implements OnInit {
  drugs = ['Aspirin', 'Panadol', 'Ampicilin'];
  prescription: PrescriptionDto;
  indicativeList: Indicative[];

  constructor(private prescriptionService: PrescriptionService,
              private fb: FormBuilder,
              private indicativeService: IndicativeService,
              private router: Router,
              @Inject(MAT_DIALOG_DATA) public data: any) {
    this.getIndicative();
    this.ngOnInit();
  }
  prescriptionForm: FormGroup = new FormGroup({});
  ngOnInit(): void {
    this.prescriptionService.findById(this.data.id).subscribe(prescriptions => {
      this.prescription = prescriptions;
      this.prescriptionForm.patchValue(this.prescription);
    });
    this.prescriptionForm = new FormGroup({
      prescriptionCode: new FormControl('', [Validators.required]),
      prescriptionName: new FormControl('', [Validators.required]),
      symptom: new FormControl('', [Validators.required]),
      object: new FormControl('', [Validators.required]),
      numberOfDay: new FormControl('', [Validators.required]),
      note: new FormControl('', [Validators.required]),
      indicatives: this.fb.array([this.fb.group({
        indicativeId: new FormControl(''),
        drug: new FormControl(''),
        totalPill: new FormControl(''),
        drinkDay: new FormControl(''),
        drinkTime: new FormControl('')
      })])
    });
  }

  getIndicative() {
    this.prescriptionService.getIdicative(this.data.id).subscribe(indicatives => {
      this.indicativeList = indicatives;
      console.log('indicative');
      console.log(this.indicativeList);
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
