import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup} from '@angular/forms';
import {EmployeeService} from '../../../service/employee.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-employee-create',
  templateUrl: './employee-create.component.html',
  styleUrls: ['./employee-create.component.css']
})
export class EmployeeCreateComponent implements OnInit {
  employeeForm: FormGroup = new FormGroup({
      employeeCode: new FormControl(),
      employeeName: new FormControl(),
      employeeAddress: new FormControl(),
      // employeeImage: new FormControl(),
      employeePhone: new FormControl(),
      employeeNote: new FormControl(),
      employeeStartDate: new FormControl(),
      position: new FormControl(),
      accountName: new FormControl()
    }
  );

  constructor(private employeeService: EmployeeService, private router: Router) {
  }

  ngOnInit(): void {
  }

  addNewEmployee() {
    const employee = this.employeeForm.value;
    console.log(employee);
    this.employeeService.save(employee).subscribe(() => {
      this.employeeForm.reset();
      // this.router.navigateByUrl('/employee');
      alert('Tạo mới thành công');
    }, e => {
      alert('Tạo mới thất bại');
    });
  }

  showPreview() {
  }
}
