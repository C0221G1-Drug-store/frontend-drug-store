import {ChangeDetectorRef, Component, Input, OnInit} from '@angular/core';
import Swal from 'sweetalert2';
import {DrugService} from '../../../../service/drug.service';
import {Drug} from '../../../../model/drug';
import {ImportBillDrug} from '../../../../model/import-bill-drug';
import {AbstractFormGroupDirective, FormArray, FormBuilder, FormGroup, Validators} from '@angular/forms';
import {  ReactiveFormsModule} from '@angular/forms';
import {ImportBill} from '../../../../model/import-bill';
@Component({
  selector: 'app-warehouse-import-drug-list',
  templateUrl: './warehouse-import-drug-list.component.html',
  styleUrls: ['./warehouse-import-drug-list.component.css']
})
export class WarehouseImportDrugListComponent implements OnInit {
  drugs: Drug[] = [];
  form = this.fb.group({
    formArrayDrugs: this.fb.array([])
  });
  constructor(private drugService: DrugService, private fb: FormBuilder, private cd: ChangeDetectorRef) { }
  listImportDrug: ImportBillDrug[] = [];
  ngOnInit(): void {
    this.drugService.getAll().subscribe(value => {
      this.drugs = value;
    });
    this.listImportDrug.forEach(value => {
      this.addNewDrug(value);
    });
  }
  get formArrayDrugs() {
    return this.form.controls.formArrayDrugs as FormArray;
  }
  confirmBox() {
    Swal.fire({
      title: 'Are you sure want to remove?',
      text: 'You will not be able to recover this file!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes, delete it!',
      cancelButtonText: 'No, keep it'
    }).then((result) => {
      if (result.value) {
        Swal.fire(
          'Deleted!',
          'Your imaginary file has been deleted.',
          'success'
        );
      } else if (result.dismiss === Swal.DismissReason.cancel) {
        Swal.fire(
          'Cancelled',
          'Your imaginary file is safe :)',
          'error'
        );
      }
    });
  }
  choiceDrug(target) {
      if (target.value !== 0) {
      this.drugService.getById(target.value).subscribe(value => {
       const importDrug: ImportBillDrug = {drug: value};
       this.addNewDrug(importDrug);
      });
      }
  }
  addNewDrug(importDrug: ImportBillDrug) {
    if ( typeof  importDrug.drug === 'undefined') {
     console.log('adad');
    } else {
      const formGroup = this.fb.group({
        ImportBillDrugId: [importDrug.ImportBillDrugId],
        importAmount: [importDrug.importAmount],
        importPrice: [importDrug.importPrice],
        discountRate: [importDrug.discountRate],
        lotNumber: [importDrug.lotNumber],
        expiry: [importDrug.expiry],
        vat: [importDrug.vat],
        importBill: [importDrug.importBill],
        drug: [importDrug.drug],
      });
      this.formArrayDrugs.push(formGroup);
    }
  }
  submit() {
    this.listImportDrug = this.formArrayDrugs.getRawValue();
    console.log();
  }
}
