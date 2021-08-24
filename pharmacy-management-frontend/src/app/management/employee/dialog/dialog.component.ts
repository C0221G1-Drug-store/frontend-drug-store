import {Component, Inject, OnInit} from '@angular/core';
import {Employee} from '../../../model/Employee';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import {EmployeeService} from '../../../service/employee.service';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {ToastrService} from 'ngx-toastr';
import {ActivatedRoute, Router} from '@angular/router';

@Component({
  selector: 'app-dialog',
  templateUrl: './dialog.component.html',
  styleUrls: ['./dialog.component.css']
})
export class DialogComponent implements OnInit {
  employee: Employee;
  employeeForm: FormGroup = new FormGroup({});

  constructor(@Inject(MAT_DIALOG_DATA) public data, private employeeService: EmployeeService,
              private toastr: ToastrService,
              private dialog: MatDialogRef<DialogComponent>,
              private r : Router, private active: ActivatedRoute) {
  }

  validationMessage = {
    employeeName: [
      {type: 'required', message: 'Trường này không được để trống.'}
    ],
    employeeAddress: [
      {type: 'required', message: 'Trường này không được để trống.'}
    ],
    employeePhone: [
      {type: 'required', message: 'Trường này không được để trống.'}
    ],
    employeeStartDate: [
      {type: 'required', message: 'Trường này không được để trống.'}
    ],
    accountName: [
      {type: 'required', message: 'Trường này không được để trống.'}
    ]
  };

  ngOnInit(): void {
    this.employeeForm = new FormGroup({
        employeeId: new FormControl(this.data.employeeId),
        employeeCode: new FormControl(this.data.employeeCode),
        employeeName: new FormControl(this.data.employeeName, Validators.required),
        employeeAddress: new FormControl(this.data.employeeAddress, Validators.required),
        employeePhone: new FormControl(this.data.employeePhone, Validators.required),
        employeeNote: new FormControl(this.data.employeeNote),
        employeeStartDate: new FormControl(this.data.employeeStartDate, Validators.required),
        position: new FormControl(this.data.position),
        accountName: new FormControl(this.data.accountName, Validators.required)
      }
    );
  }
  compareFn(c1: any, c2: any): boolean {
    return c1 && c2 ? c1.id === c2.id : c1 === c2;
  }

  updateEmployee() {
    // Call API to create

    this.employee = this.employeeForm.value;
    console.log(this.employee);
    this.employeeService.save(this.employee.employeeId,this.employee).subscribe(() => {

      this.showSuccess();
      window.location.reload();
    }, e => {
      this.showError();
    });
  }

  showSuccess() {
    this.toastr.success('Chỉnh sửa hoàn tất !', 'Thông báo : ');
  }

  showError() {
    this.toastr.error('Chỉnh sửa thất bại!', 'Cảnh báo : ');
  }

}
