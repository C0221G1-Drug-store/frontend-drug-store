import {AfterViewInit, Component, OnInit, ViewChild} from '@angular/core';
import {WarehouseImportDrugListComponent} from '../warehouse-import-drug-list/warehouse-import-drug-list.component';
import Swal from 'sweetalert2';
import {DrugService} from '../../../../service/drug.service';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {Payment} from '../../../../model/payment';
import {ManufacturerService} from '../../../../service/manufacturer.service';
import {Manufacturer} from '../../../../model/manufacturer';
import {MatDialog} from '@angular/material/dialog';
import {ManufacturerCreateComponent} from '../../../manufacturer/manufacturer-create/manufacturer-create.component';
import {Employee} from '../../../../model/employee';
import {PaymentService} from '../../../../service/payment.service';
import {ImportBillService} from '../../../../service/import-bill.service';
import {ImportBilDrugService} from '../../../../service/import-bil-drug.service';

@Component({
  selector: 'app-warehouse-import-create',
  templateUrl: './warehouse-import-create.component.html',
  styleUrls: ['./warehouse-import-create.component.css']
})
export class WarehouseImportCreateComponent implements OnInit, AfterViewInit {
  @ViewChild(WarehouseImportDrugListComponent) childImportDrugList!: WarehouseImportDrugListComponent;
  form: FormGroup;
  manufacturers: Manufacturer[] = [];
  employee: Employee = {
    employeeId: '1',
    employeeCode: 'NV23123',
    employeeName: 'Trần việt'
  };
  drugMoney;

  constructor(private fb: FormBuilder,
              private manufacturerService: ManufacturerService,
              public dialog: MatDialog,
              private paymentService: PaymentService,
              private importBillService: ImportBillService,
              private importBillDrugService: ImportBilDrugService) {
  }

  ngOnInit(): void {
    this.manufacturerService.findAllNormal().subscribe(value => {
      this.manufacturers = value;
    });
    this.form = this.fb.group({
      importSystemCode: ['HD' + (Math.floor((Math.random() * (100000 - 9999))) + 10000)],
      accountingVoucher: ['', Validators.required],
      invoiceDate: ['', Validators.required],
      flag: true,
      payment: this.fb.group({
        paymentId: [''],
        totalMoney: ['', [Validators.required, Validators.min(0), Validators.pattern('^(?:0|[1-9][0-9]*)\\.[0-9]+$')]],
        prepayment: ['', [Validators.required, Validators.min(0), Validators.pattern('^[0-9]+$')]],
        discount: ['', [Validators.required, Validators.min(0), Validators.pattern('^[0-9]+$'), Validators.max(100)]],
        status: [''],
      }),
      manufacturer: [''],
      employee: [this.employee]
    });
  }

  ngAfterViewInit() {
  }

  confirmBox() {
    Swal.fire({
      title: 'Bạn có muons xóa thuốc này không?',
      text: 'thuốc trong danh sách sẽ bị xóa!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Ok ',
      cancelButtonText: 'Không '
    }).then((result) => {
      if (result.value) {
        this.childImportDrugList.remoteImportDrug(this.childImportDrugList.choiceDelete);
        Swal.fire(
          'Xóa thành công!',
          'Thuốc đã được xóa.',
          'success'
        );
      } else if (result.dismiss === Swal.DismissReason.cancel) {
        Swal.fire(
          'Không xóa',
          'Thuốc vẫn nằm trong danh sách)',
          'error'
        );
      }
    });
  }

  submit() {
    console.log(this.form);
    if (this.payment.valid) {
      this.paymentService.create(this.payment.value).subscribe(value => {
        this.payment.setValue(value);
        this.importBillService.create(this.form.value).subscribe(importBill => {
          if (this.childImportDrugList.formArrayDrugs.valid) {
            this.childImportDrugList.formArrayDrugs.getRawValue().forEach(importBillDrug => {
              importBillDrug.importBill = importBill;
              this.importBillDrugService.create(importBillDrug).subscribe();
            });
          }
        });
      });
    }
  }
  get payment() {
    return this.form.controls.payment;
  }

  passTotalMonney(event: any) {
    if (typeof event === 'number') {
      this.drugMoney = event;
      this.chargeTotalMoney();
    }
  }

  chargeTotalMoney() {
    const discount = this.payment.get('discount').value;
    if (discount > 0 || discount === '') {
      this.payment.get('totalMoney').setValue(this.drugMoney * (100 - discount) / 100);
    } else {
      this.payment.get('totalMoney').setValue('');
    }
  }

  openDialog() {
    const dialogRef = this.dialog.open(ManufacturerCreateComponent);
    dialogRef.afterClosed().subscribe(result => {
      if (typeof result !== 'undefined') {
        this.manufacturerForm.setValue(result);
      }
      this.manufacturerService.findAllNormal().subscribe(value => {
        this.manufacturers = value;
      });
    });
  }

  get manufacturerForm() {
    return this.form.controls.manufacturer as FormGroup;
  }

  choiceManufacturer(e) {
    this.manufacturerService.findByIdManufacture(e.target.value).subscribe(value => {
      this.manufacturerForm.setValue(value);
    });
  }

}
