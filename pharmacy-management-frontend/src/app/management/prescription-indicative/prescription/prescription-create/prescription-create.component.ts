import {Component, OnInit} from '@angular/core';
import {PrescriptionService} from '../../../../service/prescription.service';
import {FormArray, FormBuilder, FormControl, FormGroup} from '@angular/forms';
import {Router} from '@angular/router';
import {IndicativeService} from '../../../../service/indicative.service';

@Component({
  selector: 'app-prescription-create',
  templateUrl: './prescription-create.component.html',
  styleUrls: ['./prescription-create.component.css']
})
export class PrescriptionCreateComponent implements OnInit {
  drugs = ['Aspirin', 'Panadol', 'Ampicilin'];

  constructor(private prescriptionService: PrescriptionService,
              private fb: FormBuilder,
              private indicativeService: IndicativeService,
              private router: Router) {
  }

  prescriptionForm: FormGroup;

  ngOnInit(): void {
    this.prescriptionForm = this.fb.group({
      prescriptionCode: new FormControl(),
      prescriptionName: new FormControl(),
      symptom: new FormControl(),
      object: new FormControl(),
      numberOfDay: new FormControl(),
      note: new FormControl(),
      indicatives: this.fb.array([this.fb.group({
        drug: '',
        totalPill: '',
        drinkDay: '',
        drinkTime: ''
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
    this.prescriptionService.savePrescription(prescription).subscribe(() => {
        this.prescriptionForm.reset();
        this.router.navigateByUrl('/prescription/prescription-list')
        alert(' Thêm mới thành công ! ');
      }, e => {
        alert(' Thêm mới thất bại !');
      }
    );
  }
}

