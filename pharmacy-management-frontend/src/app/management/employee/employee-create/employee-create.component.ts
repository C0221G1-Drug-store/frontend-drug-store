import {Component, Inject, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {EmployeeService} from '../../../service/employee.service';
import {Router} from '@angular/router';
import {Employee} from '../../../model/employee';
import {AngularFireStorage} from '@angular/fire/storage';
import {finalize} from 'rxjs/operators';
import {formatDate} from '@angular/common';

@Component({
  selector: 'app-employee-create',
  templateUrl: './employee-create.component.html',
  styleUrls: ['./employee-create.component.css']
})

export class EmployeeCreateComponent implements OnInit {
  employeeForm: FormGroup;
  employee: Employee;
  selectedImage: any = null;

  constructor(private employeeService: EmployeeService,
              private router: Router,
              @Inject(AngularFireStorage) private storage: AngularFireStorage) {
  }


  validationMessage = {
    employeeName: [
      {type: 'required', message: 'Trường này không được để trống. (*)'}
    ],
    employeeAddress: [
      {type: 'required', message: 'Trường này không được để trống. (*)'}
    ],
    employeePhone: [
      {type: 'required', message: 'Trường này không được để trống. (*)'}
    ],
    employeeStartDate: [
      {type: 'required', message: 'Trường này không được để trống. (*)'}
    ],
    accountName: [
      {type: 'required', message: 'Trường này không được để trống. (*)'}
    ]
  };

  ngOnInit(): void {
    this.employeeForm = new FormGroup({
        employeeCode: new FormControl(),
        employeeName: new FormControl('', Validators.required),
        employeeAddress: new FormControl('', Validators.required),
        employeeImage: new FormControl(),
        employeePhone: new FormControl('', Validators.required),
        employeeNote: new FormControl(),
        employeeStartDate: new FormControl('', Validators.required),
        position: new FormControl(),
        accountName: new FormControl('', Validators.required)
      }
    );
  }

  addNewEmployee() {
    // upload image to firebase
    // const nameImg = this.getCurrentDateTime();
    const nameImg = this.getCurrentDateTime() + this.selectedImage.name;
    const fileRef = this.storage.ref(nameImg);
    this.storage.upload(nameImg, this.selectedImage).snapshotChanges().pipe(
      finalize(() => {
        fileRef.getDownloadURL().subscribe((url) => {

          this.employeeForm.patchValue({employeeImage: url});
          // Call API to create
          this.employee = this.employeeForm.value;
          this.employeeService.save(this.employee).subscribe(() => {
            this.router.navigateByUrl('/employee').then(s => alert('Thêm mới thành công!'));
          }, e => {
            alert('Tạo mới thất bại');
          });
        });
      })
    ).subscribe();
  }

  showPreview(event: any) {
    this.selectedImage = event.target.files[0];
  }

  getCurrentDateTime(): string {
    return formatDate(new Date(), 'dd-MM-yyyyhhmmssa', 'en-US');
  }

}
