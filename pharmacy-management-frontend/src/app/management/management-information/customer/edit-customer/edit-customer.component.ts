import { Component, OnInit } from '@angular/core';
import {CustomerGroup} from '../../../../model/CustomerGroup';
import {FormGroup} from '@angular/forms';
import {ToastrService} from 'ngx-toastr';
import {CustomerServiceService} from '../customer-service.service';




@Component({
  selector: 'app-edit-customer',
  templateUrl: './edit-customer.component.html',
  styleUrls: ['./edit-customer.component.css']
})
export class EditCustomerComponent implements OnInit {
  customerForm: FormGroup;
  customerGroup: CustomerGroup[] = [];
  private router: any;
  checkUpLoad: true;


  constructor(private customerService: CustomerServiceService,
              private toastService: ToastrService) { }

  ngOnInit(): void {
  }

  submitForm() {
    const temp = this.customerForm.value;
    this.customerService.edit(temp).subscribe(value => {
      this.callToastr();
      this.router.navigateByUrl('/customer');
    });
  }

  private callToastr() {
    this.toastService.success('thông tin khách hàng chỉnh sửa thành công...', 'Chỉnh sửa', {
      timeOut: 1500,
      progressBar: true,
      progressAnimation: 'increasing'
    });
}

  cancelSubmit() {
    this.router.navigateByUrl('/create');
  }
}
