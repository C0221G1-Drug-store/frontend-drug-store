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
    this.prescriptionService.findById(this.idEdit).subscribe(pres => {
      this.prescriptionForm = this.fb.group({
        prescriptionCode: new FormControl(pres.prescriptionCode),
        prescriptionName: new FormControl(pres.prescriptionName),
        symptom: new FormControl(pres.symptom),
        object: new FormControl(pres.object),
        numberOfDay: new FormControl(pres.numberOfDay),
        note: new FormControl(pres.note),
        indicatives: this.fb.array([this.fb.group({
          drug: '',
          totalPill: '',
          drinkDay: '',
          drinkTime: ''
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
