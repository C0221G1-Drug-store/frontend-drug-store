import { Component, OnInit } from '@angular/core';
import {EmployeeDeleteComponent} from "../employee-delete/employee-delete.component";
import {Employee} from "../../../model/Employee";
import {EmployeeService} from "../../../service/employee.service";
import {MatDialog} from "@angular/material/dialog";

@Component({
  selector: 'app-list-employee',
  templateUrl: './list-employee.component.html',
  styleUrls: ['./list-employee.component.css']
})
export class ListEmployeeComponent implements OnInit {

  employeeName = "";
  employeeAddress = "";
  employeeCode = "" ;
  employeePhone = "";
  position = "";
  sortBy = 'employee_id';
  employees: Employee[];
  pages: Array<any>;
  page = 0;
  select: any;
  searchValue: any;
  employee: Employee;
  change: number;


  constructor(private employeeService: EmployeeService, private dialog: MatDialog) {

  }

  ngOnInit(): void {
    this.getEmployees();
  }

  getEmployees() {
    this.employeeService.findEmployeeByRequest(this.employeeName , this.employeeAddress , this.employeeCode, this.employeePhone, this.position, this.page , this.sortBy).subscribe(employee => {
      if (employee === null){
        this.employees= [];
        alert("không tìm thấy kết quả");


      }
      this.employees = employee['content'];
      this.pages = new Array<any>(employee['totalPages']);
      console.log(this.pages);
    });
  }



  setPage(i: number) {
    this.page = i;
    this.getEmployees();

  }

  previous() {
    if (this.page === 0) {
      alert('Khong tim thay trang');
    } else {
      this.page = this.page - 1;
      this.getEmployees();
    }
  }

  next() {
    if (this.page > this.pages.length - 2) {
      alert('ko tim thay trang');
    } else {
      this.page = this.page + 1;
      this.getEmployees();
    }
  }

  search() {
    switch (this.select){
      case 'code':
        this.employeeCode=  this.searchValue;
        this.getEmployees();
        break;
      case 'name':
        this.employeeCode = "";
        this.employeeName =this.searchValue;
        this.getEmployees();
        break;
      case 'address':
        this.employeeCode = "";
        this.employeeName = "";
        this.employeeAddress = this.searchValue;
        this.getEmployees()
        break;
      case 'position':
        this.employeeCode = "";
        this.employeeName = "";
        this.employeeAddress = "";
        this.position = this.searchValue;
        this.getEmployees();
        break;


    }
    // <option value="employeeName">Tên  Nhân Viên</option>
    // <option value="">mã nhân viên</option>
    // <option value="position">chức vụ</option>
    // <option value="employeeStartDate">ngày vào làm</option>
    // <option value="employeeAddress">địa chỉ</option>
    // <option value="employeePhone">Điện thoại</option>
  }

  getEmpl(e: Employee) {
    this.employee =e;
    this.change = e.employeeId;

  }

  onDeleteHandler(): void {
    console.log(this.employee);
    const dialogRef = this.dialog.open(EmployeeDeleteComponent, {
      width: '250px',
      data: this.employee
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      if (result) {
        this.employeeService.deleteEmployeeByRequest(this.employee.employeeId).subscribe(next => {
          this.getEmployees();
        });
      }
    });
  }


  sortByRequest() {
    this.getEmployees();

  }
}
