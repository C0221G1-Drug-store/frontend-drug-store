import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {Router} from '@angular/router';
import {Customer} from '../../../../model/customer';
import {CustomerGroup} from '../../../../model/CustomerGroup';
import {CustomerServiceService} from '../customer-service.service';

@Component({
  selector: 'app-create-customer',
  templateUrl: './create-customer.component.html',
  styleUrls: ['./create-customer.component.css']
})
export class CreateCustomerComponent implements OnInit {
  customerGroup: CustomerGroup[] = [];
  messageName = '';
  checkUpLoad: true;

  customerForm: FormGroup = new FormGroup({
    customerId: new FormControl(),
    customerCode: new FormControl(),
    customerGroup: new FormControl(''),
    customerName: new FormControl('', [Validators.required, Validators.minLength(10)]),
    customerAge: new FormControl('', Validators.required),
    customerPhone: new FormControl(),
    customerAddress: new FormControl(),
  });
  constructor(
    private route: Router,
    private customerService: CustomerServiceService
  ) { }

  ngOnInit(): void {
  }

  submit() {
    const customer: Customer = this.customerForm.value;
    console.log(customer);
    this.customerService.saveCustomer(customer).subscribe(data => {
      console.log('Add Success ' + data);
      this.backToList();
    }, error => {
      console.log('Add Fail ' + error);
    });
  }

  private backToList() {
    this.route.navigateByUrl('customer');
  }

  cancelSubmit() {
    this.route.navigateByUrl('/create');
  }
}
