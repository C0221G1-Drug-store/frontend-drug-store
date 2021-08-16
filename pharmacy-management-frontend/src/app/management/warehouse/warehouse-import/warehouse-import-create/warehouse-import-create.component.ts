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
  payment: Payment;

  constructor(private fb: FormBuilder, private manufacturerService: ManufacturerService, public dialog: MatDialog) {
    this.manufacturerService.findAllNormal().subscribe(value => {
      this.manufacturers = value;
    });
    this.form = this.fb.group({
      importSystemCode: ['HD' + (Math.floor((Math.random() * (100000 - 9999))) + 10000)],
      accountingVoucher: ['', Validators.required],
      invoiceDate: ['', Validators.required],
      flag: true,
      payment: this.fb.group({
        paymentId : [''],
        totalMoney: [''],
        prepayment: [''],
        discount: [''],
        status: [''],
      }),
      manufacturer: [''],
      employee: [this.employee]
    });
  }

  ngOnInit(): void {
  }

  ngAfterViewInit() {
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
        this.childImportDrugList.remoteImportDrug(this.childImportDrugList.choiceDelete);
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

  submit() {
    console.log(this.childImportDrugList.formArrayDrugs.getRawValue());
  }

  get totalMoney() {
    return this.form.controls.payment.get('totalMoney');
  }

  passTotalMonney(event: any) {
    this.drugMoney = event;
    this.chargeTotalMoney();
  }

  chargeTotalMoney() {
    const discount = this.form.controls.payment.get('discount').value;
    console.log(discount);
    this.totalMoney.setValue(this.drugMoney * (100 - discount) / 100);
  }

  openDialog() {
    const dialogRef = this.dialog.open(ManufacturerCreateComponent);
    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
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
