import {Component, DoCheck, ElementRef, EventEmitter, Input, OnInit, Output} from '@angular/core';
import Swal from 'sweetalert2';
import {DrugService} from '../../../../service/drug.service';
import {Drug} from '../../../../model/drug';
import {ImportBillDrug} from '../../../../model/import-bill-drug';
import { FormArray, FormBuilder, FormGroup, Validators} from '@angular/forms';
@Component({
  selector: 'app-warehouse-import-drug-list',
  templateUrl: './warehouse-import-drug-list.component.html',
  styleUrls: ['./warehouse-import-drug-list.component.css']
})
export class WarehouseImportDrugListComponent implements OnInit {
  drugs: Drug[] = [];
  choiceDelete;
  totalMoney;
  form = this.fb.group({
    formArrayDrugs: this.fb.array([])
  });
  @Output() sendTotal = new EventEmitter<any>();
  constructor(private drugService: DrugService, private fb: FormBuilder, private elementRef: ElementRef) { }
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
        importBillDrugId: [importDrug.importBillDrugId],
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
  remoteImportDrug(id) {
    console.log(id);
    this.formArrayDrugs.removeAt(id);
    this.refreshColor();
  }
  clickDelete(e) {
    this.refreshColor();
    const parentElement = e.target.closest('.onRow') as Element;
    parentElement.classList.add('choice-del');
    this.choiceDelete = parentElement.id;
  }
  refreshColor() {
    const dom: HTMLElement = this.elementRef.nativeElement;
    const elements = dom.querySelectorAll('.onRow');
    elements.forEach(value => {
      value.classList.remove('choice-del');
    });
  }

  totalMoneyCalculation() {
    this.totalMoney = 0;
    const dom: HTMLElement = this.elementRef.nativeElement;
    const elements = dom.querySelectorAll('.total-money');
    elements.forEach(e => {
      this.totalMoney -= - ( e as HTMLInputElement).value;
    });
    this.sendTotal.emit(this.totalMoney);
  }
}
