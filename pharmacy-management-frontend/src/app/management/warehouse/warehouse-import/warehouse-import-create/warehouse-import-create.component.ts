import {AfterViewInit, Component, OnInit, ViewChild} from '@angular/core';
import {WarehouseImportDrugListComponent} from '../warehouse-import-drug-list/warehouse-import-drug-list.component';
import Swal from 'sweetalert2';
import {DrugService} from '../../../../service/drug.service';
import {AbstractControl, FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {Payment} from '../../../../model/payment';
import {ManufacturerService} from '../../../../service/manufacturer.service';
import {Manufacturer} from '../../../../model/manufacturer';
import {MatDialog} from '@angular/material/dialog';
import {ManufacturerCreateComponent} from '../../../manufacturer/manufacturer-create/manufacturer-create.component';
import {Employee} from '../../../../model/employee';
import {PaymentService} from '../../../../service/payment.service';
import {ImportBillService} from '../../../../service/import-bill.service';
import {ImportBilDrugService} from '../../../../service/import-bil-drug.service';
import {ActivatedRoute, Router} from '@angular/router';
import {ImportListDrugComponent} from '../import-list-drug/import-list-drug.component';

@Component({
  selector: 'app-warehouse-import-create',
  templateUrl: './warehouse-import-create.component.html',
  styleUrls: ['./warehouse-import-create.component.css']
})
export class WarehouseImportCreateComponent implements OnInit, AfterViewInit {
  @ViewChild(ImportListDrugComponent) childImportDrugList!: ImportListDrugComponent;
  form: FormGroup;
  manufacturers: Manufacturer[] = [];
  employee: Employee = {
    employeeId: '1',
    employeeCode: 'NV23123',
    employeeName: 'Trần việt'
  };
  drugMoney;
  importSystemCode;

  constructor(private fb: FormBuilder,
              private manufacturerService: ManufacturerService,
              public dialog: MatDialog,
              private paymentService: PaymentService,
              private importBillService: ImportBillService,
              private importBillDrugService: ImportBilDrugService,
              private route: ActivatedRoute,
              private router: Router) {
  }

  ngOnInit(): void {
    this.manufacturerService.findAllNormal().subscribe(value => {
      this.manufacturers = value;
    });
    this.importSystemCode = 'HD' + (Math.floor((Math.random() * (100000 - 9999))) + 10000);
    this.form = this.fb.group({
      importSystemCode: [this.importSystemCode],
      accountingVoucher: ['', Validators.required],
      invoiceDate: ['', [Validators.required, Validators.pattern('^([12]\\d{3}-(0[1-9]|1[0-2])-(0[1-9]|[12]\\d|3[01]))T[0-9]{2}:[0-9]{2}$')]],
      flag: true,
      payment: this.fb.group({
        paymentId: [''],
        totalMoney: ['', [Validators.required, Validators.min(0), Validators.pattern('^(?:0|[1-9][0-9]*)\\.[0-9]+$')]],
        prepayment: ['', [Validators.required, Validators.min(0), Validators.pattern('^[0-9]+$')]],
        discount: ['', [Validators.required, Validators.min(0), Validators.pattern('^[0-9]+$'), Validators.max(100)]],
        status: [''],
      }),
      manufacturer: ['', Validators.required],
      employee: [this.employee]
    });
  }

  ngAfterViewInit() {
  }

  confirmBox() {
    if (typeof this.childImportDrugList.choiceDelete != 'undefined') {
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
    } else {
      Swal.fire({
        icon: 'error',
        title: 'Bạn chưa chọn thuốc để xóa',
        text: 'vui lòng chọn thuốc từ danh sách',
      });
    }

  }

  submit() {
    console.log(this.form);
    if (this.checkSubmit) {
      this.paymentService.create(this.payment.value).subscribe(value => {
        this.addNewImportBill(value);
      }, error => {
        this.errorAlert('Có lỗi từ hệ thống');
      });
    }
  }

  get checkSubmit() {
    if (this.form.get('invoiceDate').invalid || this.form.get('accountingVoucher').invalid) {
      this.errorAlert('form nhập không hợp lệ');
      return false;
    }
    if (this.form.get('importSystemCode').value != this.importSystemCode) {
      this.errorAlert('Mã hóa đơn được tạo tự động .không thể sửa');
      return false;
    }
    if (this.payment.invalid) {
      this.errorAlert('Thông tin thanh toán bị sai');
      return false;
    }
    if (this.childImportDrugList.formArrayDrugs.invalid) {
      this.errorAlert('Danh sách thuốc bị sai');
      return false;
    }
    if (this.manufacturerForm.invalid) {
      this.errorAlert('Thông tin nhà cung cấp sai');
      return false;
    }
    return true;
  }

  errorAlert(reason) {
    Swal.fire({
      icon: 'error',
      title: 'Tạo hóa đơn không thành công',
      text: reason,
    });
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

  get manufacturerName() {
    return this.manufacturerForm.value.manufacturerName !== undefined ? this.manufacturerForm.value.manufacturerName : '';
  }

  get manufacturerAddress() {
    return this.manufacturerForm.value.manufacturerAddress !== undefined ? this.manufacturerForm.value.manufacturerAddress : '';
  }

  get manufacturerNote() {
    return this.manufacturerForm.value.manufacturerNote !== undefined ? this.manufacturerForm.value.manufacturerNote : '';
  }

  get cashInReturn() {
    return Math.round(this.payment.get('totalMoney').value - this.payment.get('prepayment').value);
  }

  get totalMoney() {
    return this.payment.get('totalMoney').value !== undefined ? Math.round(this.payment.get('totalMoney').value) : '';
  }

  addNewImportBillDrug(importBill): boolean {
    const idImportBillDrug = [];
    let check = false;
    this.childImportDrugList.formArrayDrugs.getRawValue().forEach(importBillDrug => {
      importBillDrug.importBill = importBill;
      this.importBillDrugService.create(importBillDrug).subscribe(next => {
        idImportBillDrug.push(next.importBillDrugId);
      }, error => {
        check = true;
      });
    });
    if (check) {
      idImportBillDrug.forEach(value => {
        this.importBillDrugService.remove(value).subscribe();
      });
      this.errorAlert('Có lỗi từ hệ thống');
      return false;
    } else {
      Swal.fire({
        position: 'top-end',
        icon: 'success',
        title: 'hợp đồng đã được thêm mới',
        showConfirmButton: false,
        timer: 1500
      }).finally(
        () => {
          this.router.navigate(['']);
        }
      );
      return true;
    }

  }

  addNewImportBill(value) {
    const idPayment = value.paymentId;
    this.payment.setValue(value);
    this.importBillService.create(this.form.value).subscribe(importBill => {
      const check = this.addNewImportBillDrug(importBill);
      if (!check) {
        this.importBillService.remove(importBill.importBillId).subscribe();
      }
    }, error => {
      this.paymentService.remove(idPayment).subscribe();
      this.errorAlert('Có lỗi từ hệ thống');
    });
  }

  dateValidator(c: AbstractControl) {
    // Not sure if c will come in as a date or if we have to convert is somehow
    const today = new Date();
    if (c.value > today) {
      return null;
    } else {
      return {dateValidator: {valid: false}};
    }
  }
}
