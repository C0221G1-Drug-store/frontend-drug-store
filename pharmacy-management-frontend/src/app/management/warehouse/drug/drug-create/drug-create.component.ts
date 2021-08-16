import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {DrugService} from '../../../../service/drug.service';

@Component({
  selector: 'app-drug-create',
  templateUrl: './drug-create.component.html',
  styleUrls: ['./drug-create.component.css']
})
export class DrugCreateComponent implements OnInit {
  drugForm: FormGroup = new FormGroup({
  drugName: new FormControl('', [Validators.required, Validators.maxLength(25)]),
    drugFaculty: new FormControl('', [Validators.required, Validators.maxLength(50)]),
    activeElement: new FormControl('', [Validators.required, Validators.maxLength(50)]),
    drugSideEffect: new FormControl('', [Validators.required, Validators.maxLength(50)]),
    conversionRate: new FormControl('', [Validators.required, Validators.min(1), Validators.pattern(/^\d*$/)]),
    // drugAmount: new FormControl('', [Validators.required, Validators.min(1), Validators.pattern(/^\d*$/)]),
    wholesaleProfitRate: new FormControl('', [Validators.required, Validators.min(0), Validators.pattern(/^\d*$/)]),
    retailProfitRate: new FormControl('', [Validators.min(0), Validators.pattern(/^\d*$/)]),
    unit: new FormControl('', [Validators.required]),
    conversionUnit: new FormControl('', [Validators.required]),
    manufacturer: new FormControl('', [Validators.maxLength(25)]),
    origin: new FormControl('', [Validators.required]),
    drugGroup: new FormControl('', [Validators.required]),
    note: new FormControl('', [Validators.maxLength(250)])
  });

  constructor(private drugService: DrugService) { }

  ngOnInit(): void {
  }

  submit() {
    const drug = this.drugForm.value;
    this.drugService.save(drug).subscribe(() => {
      alert('Tạo thành công');
      this.drugForm.reset();
    }, e => console.log(e));
  }
}
