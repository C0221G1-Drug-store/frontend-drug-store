import {Component, DoCheck, ElementRef, EventEmitter, Input, OnInit, Output} from '@angular/core';
import Swal from 'sweetalert2';
import {DrugService} from '../../../../service/drug.service';
import {Drug} from '../../../../model/drug';
import {ImportBillDrug} from '../../../../model/import-bill-drug';
import {AbstractControl, FormArray, FormBuilder, FormGroup, ValidatorFn, Validators} from '@angular/forms';

@Component({
  selector: 'app-import-list-drug',
  templateUrl: './import-list-drug.component.html',
  styleUrls: ['./import-list-drug.component.css']
})
export class ImportListDrugComponent implements OnInit {

  drugs: Drug[] = [];
  choiceDelete;
  totalMoney;
  indexPagination = 0;
  totalPagination = 0;
  form = this.fb.group({
    formArrayDrugs: this.fb.array([])
  });
  @Output() sendTotal = new EventEmitter<any>();

  constructor(private drugService: DrugService, private fb: FormBuilder, private elementRef: ElementRef) {
  }

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
    if (target.value !== '0') {
      this.drugService.getById(target.value).subscribe(value => {
        if (value !== null) {
          const importDrug: ImportBillDrug = {drug: value};
          this.addNewDrug(importDrug);
          // dung cho truong hop chi mot lan nhap ten thuoc
          // const del = this.drugs.findIndex(value1 => value1.drugId === Number(target.value));
          // this.drugs.splice(del, 1);
        }else {
          Swal.fire({
            icon: 'error',
            title: 'thuốc không có trong danh sách',
            text: 'vui lòng chọn thuốc từ danh sách hoặc tạo mới',
          })
        }
      });
    }
  }
  errorAlert(reason) {
    Swal.fire({
      icon: 'error',
      title: 'Tạo hóa đơn không thành công',
      text: reason,
    });
  }
  addNewDrug(importDrug: ImportBillDrug) {
    if (typeof importDrug.drug === 'undefined') {
        this.errorAlert('có lỗi từ hệ thống')
    } else {
      const formGroup = this.fb.group({
        importBillDrugId: [importDrug.importBillDrugId],
        importAmount: [importDrug.importAmount, [Validators.required, Validators.min(0) , Validators.pattern('^[0-9]+$')]],
        importPrice: [importDrug.importPrice, [Validators.required, Validators.min(0), Validators.pattern('^[0-9]+$')]],
        discountRate: [importDrug.discountRate, [Validators.required, Validators.min(0), Validators.max(100), Validators.pattern('^[0-9]+$')]],
        lotNumber: [importDrug.lotNumber, [Validators.required, Validators.min(0)]],
        expiry: [importDrug.expiry, [Validators.required, Validators.pattern('^([12]\\d{3}-(0[1-9]|1[0-2])-(0[1-9]|[12]\\d|3[01]))$'), this.dateValidator()]],
        vat: [importDrug.vat, [Validators.required, Validators.min(0), Validators.max(100), Validators.pattern('^[0-9]+$')]],
        importBill: [importDrug.importBill],
        drug: [importDrug.drug],
      });
      this.formArrayDrugs.push(formGroup);
      this.totalPagination = Math.ceil(this.formArrayDrugs.getRawValue().length / 5) ;
    }
  }

  remoteImportDrug(id) {
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
      this.totalMoney -= -(e as HTMLInputElement).value;
    });
    this.sendTotal.emit(this.totalMoney);
  }

  previousPage() {
    if (this.indexPagination > 0) {
      this.indexPagination -= 1;
    }
  }

  nextPage() {
    if (this.indexPagination < this.totalPage) {
      this.indexPagination += 1;
    }
    console.log(this.indexPagination);
    console.log(this.totalPagination);
  }

  showList(i: number) {
    return i < 5 * (this.indexPagination) + 5 && i >= 5 * (this.indexPagination);
  }

  get totalPage() {
    if (this.formArrayDrugs.getRawValue().length > 0) {
      return Math.ceil(this.formArrayDrugs.getRawValue().length / 5) - 1;
    } else {
      return 0;
    }
  }
  choicePage(i) {
    this.indexPagination = i;
  }
  dateValidator(): ValidatorFn {
    return (control: AbstractControl): {[key: string]: any} | null => {
      const today = new Date().getTime();

      if(!(control && control.value)) {
        // if there's no control or no value, that's ok
        return null;
      }

      // return null if there's no errors
      return this.parseDate(control.value).getTime() < today
        ? {invalidDate: 'You cannot use past dates' }
        : null;
    }
  }
  parseDate(input) {
    const parts = input.match(/(\d+)/g);
    // new Date(year, month [, date [, hours[, minutes[, seconds[, ms]]]]])
    return new Date(parts[0], parts[1]-1, parts[2]); // months are 0-based
  }
}

