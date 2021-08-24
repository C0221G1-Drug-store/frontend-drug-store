import {Component, OnInit} from '@angular/core';
import {CustomerGroup} from '../../../../model/CustomerGroup';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {ToastrService} from 'ngx-toastr';
import {CustomerService} from '../../../../service/customer.service';
import {Customer} from '../../../../model/customer';
import {ActivatedRoute} from '@angular/router';

@Component({
  selector: 'app-edit-customer',
  templateUrl: './edit-customer.component.html',
  styleUrls: ['./edit-customer.component.css']
})
export class EditCustomerComponent implements OnInit {
  customerGroup: CustomerGroup[] = [];
  private router: any;
  checkUpLoad: true;
  customerForm: FormGroup;
  customer: Customer;


  private id: number;


  constructor(private customerService: CustomerService,
              private activatedRoute: ActivatedRoute,
              private toastService: ToastrService) {
  }

  ngOnInit(): void {

    this.customerService.getCustomerGroup().subscribe(data => {
      this.customerGroup = data;
    }, error => {
      console.log('get ' + error);
    });

    const id: number = this.activatedRoute.snapshot.params.id;
    this.id = id;
    this.customerService.findById(id).subscribe(data => {
      this.customerForm = new FormGroup({
        customerId: new FormControl(data.customerId),
        customerCode: new FormControl(data.customerCode),
        customerGroup: new FormControl(data.customerGroup),
        customerName: new FormControl(data.customerName, [Validators.required, Validators.minLength(10)]),
        customerAge: new FormControl(data.customerAge, Validators.required),
        customerPhone: new FormControl(data.customerPhone),
        customerAddress: new FormControl(data.customerAddress),
      });
    });
  }

  submitForm() {
    const temp = this.customerForm.value;
    this.customerService.edit(temp, this.id).subscribe(value => {
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
