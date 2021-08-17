import {Component, OnInit} from '@angular/core';
import {PrescriptionService} from '../../../../service/prescription.service';
import {FormArray, FormBuilder, FormControl, FormGroup} from '@angular/forms';
import {IndicativeService} from '../../../../service/indicative.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-prescription-edit',
  templateUrl: './prescription-edit.component.html',
  styleUrls: ['./prescription-edit.component.css']
})
export class PrescriptionEditComponent implements OnInit {
  idEdit: number;
  drugs = ['Aspirin', 'Panadol', 'Ampicilin'];

  constructor(private prescriptionService: PrescriptionService,
              private fb: FormBuilder,
              private indicativeService: IndicativeService,
              private router: Router) {
  }

  prescriptionForm: FormGroup;

  ngOnInit(): void {
    this.prescriptionService.findById(this.idEdit).subscribe(prescriptions => {
      console.log('loggggg' + prescriptions.prescriptionName);
      this.prescriptionForm = this.fb.group({
        prescriptionId: new FormControl(prescriptions.prescriptionId),
        prescriptionCode: new FormControl(prescriptions.prescriptionCode),
        prescriptionName: new FormControl(prescriptions.prescriptionName),
        symptom: new FormControl(prescriptions.symptom),
        object: new FormControl(prescriptions.object),
        numberOfDay: new FormControl(prescriptions.numberOfDay),
        note: new FormControl(prescriptions.note),
        indicatives: this.fb.array([this.fb.group({
          indicativeId: new FormControl(''),
          drug: new FormControl(''),
          totalPill: new FormControl(''),
          drinkDay: new FormControl(''),
          drinkTime: new FormControl('')
        })])
      });
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

  submit(idEdit: number) {
    const prescription = this.prescriptionForm.value;
    this.prescriptionService.updatePrescription(idEdit, prescription).subscribe(() => {
        this.prescriptionForm.reset();
        this.router.navigateByUrl('/prescription/prescription-list');
        alert(' Thêm mới thành công ! ');
      }, e => {
        alert(' Thêm mới thất bại !');
      }
    );
  }
}
