import { Component, OnInit } from '@angular/core';
import {CustomerService} from '../../../../service/customer.service';
import {Customer} from '../../../../model/customer';

@Component({
  selector: 'app-customer-list',
  templateUrl: './customer-list.component.html',
  styleUrls: ['./customer-list.component.css']
})
export class CustomerListComponent implements OnInit {
  id: number;
  customerDelete: Customer;
  customers: Customer[] = [];
  constructor(private customerService: CustomerService) { }

  ngOnInit(): void {
  }
  getAllCustomer() {
    this.customerService.getAll().subscribe(data => {
      this.customers = data;
    });
  }

  sendId(id: number) {
    if (id === this.id) {
      this.id = null;
    } else {
      this.id = id;
    }
  }

  getColor() {
  }

  getCustomerDelete() {
    if (this.id) {
      this.customerService.findById(this.id).subscribe(data => {
        this.customerDelete = data;
      }, error => {
        console.log(error);
      });
    } else {
      console.log('k có id');
    }
  }

  deleteCustomer() {
    this.customerService.delete(this.id).subscribe(() => {
      console.log('delete is success');
      this.getAllCustomer();
    });
  }

  reset() {
    this.id = null;
    this.customerDelete = null;
  }
}
