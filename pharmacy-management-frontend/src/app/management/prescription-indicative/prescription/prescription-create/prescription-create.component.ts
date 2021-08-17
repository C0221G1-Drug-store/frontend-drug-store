import {Component, OnInit} from '@angular/core';
import {PrescriptionService} from '../../../../service/prescription.service';
import {FormArray, FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {Router} from '@angular/router';
import {IndicativeService} from '../../../../service/indicative.service';
import validate = WebAssembly.validate;

@Component({
  selector: 'app-prescription-create',
  templateUrl: './prescription-create.component.html',
  styleUrls: ['./prescription-create.component.css']
})
export class PrescriptionCreateComponent implements OnInit {
  drugs = ['Aspirin', 'Panadol', 'Ampicilin'];
  idPres = 0;

  constructor(private prescriptionService: PrescriptionService,
              private fb: FormBuilder,
              private indicativeService: IndicativeService,
              private router: Router) {
  }

  prescriptionForm: FormGroup;

  ngOnInit(): void {
    this.prescriptionForm = this.fb.group({
      prescriptionCode: new FormControl('', [Validators.required, Validators.pattern('^(T)-[0-9]{4}$')]),
      prescriptionName: new FormControl('', [Validators.required]),
      symptom: new FormControl('', [Validators.required]),
      object: new FormControl('', [Validators.required]),
      numberOfDay: new FormControl('', [Validators.required]),
      note: new FormControl('', [Validators.required]),
      indicatives: this.fb.array([this.fb.group({
        drug: new FormControl('', [Validators.required]),
        totalPill: new FormControl('', [Validators.required]),
        drinkDay: new FormControl('', [Validators.required]),
        drinkTime: new FormControl('', [Validators.required]),
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
    console.log(prescription);
    this.prescriptionService.savePrescription(prescription).subscribe(() => {
        this.prescriptionForm.reset();
        this.router.navigateByUrl('/prescription/prescription-list');
        alert(' Thêm mới thành công ! ');
      }, error => {
        alert(' Thêm mới thất bại !');
      }
    );
  }
}

