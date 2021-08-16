import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {CustomerService} from '../../../../service/customer.service';
import {Customer} from '../../../../model/customer';
import {NgbModalConfig} from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-customer-list',
  templateUrl: './customer-list.component.html',
  styleUrls: ['./customer-list.component.css']
})
export class CustomerListComponent implements OnInit {
  p = 1;
  id: number;
  customerDelete: Customer;
  customers: Customer[] = [];

  constructor(private customerService: CustomerService,
              config: NgbModalConfig) {
  }

  ngOnInit(): void {
    this.getAllCustomer();
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
    this.customerDelete.flag = false;
    this.customerService.updateStatusDelete(this.id, this.customerDelete).subscribe(() => {
      this.getAllCustomer();
    });
  }

  reset() {
    this.id = null;
    this.customerDelete = null;
  }

  search(keyword: string) {
    if (keyword !== '') {
      this.customerService.searchAllField(keyword).subscribe(data => {
        if (data != null) {
          this.customers = data;
          console.log(data);
        } else {
          this.customers = [];
        }
      }, error => {
        console.log(error);
      });
    } else {
      this.getAllCustomer();
    }
  }

  sort(typeSort: string) {
    if (typeSort === 'customer_group') {
      this.customers = this.customers.sort((a, b) => a.customerGroup.customerGroupId - b.customerGroup.customerGroupId);
    }
    if (typeSort === 'customer_name') {
      this.customers.sort(function(c1, c2) {
        const a = c1.customerName.toLowerCase();
        const b = c2.customerName.toLowerCase();
        return a === b ? 0 : a > b ? 1 : -1;
      });
    }
    if (typeSort === 'customer_address') {
      this.customers.sort(function(c1, c2) {
        const a = c1.customerAddress.toLowerCase();
        const b = c2.customerAddress.toLowerCase();
        return a === b ? 0 : a > b ? 1 : -1;
      });
    }
    if (typeSort === 'customer_code') {
      this.customers.sort(function(c1, c2) {
        const a = c1.customerCode.toLowerCase();
        const b = c2.customerCode.toLowerCase();
        return a === b ? 0 : a > b ? 1 : -1;
      });
    }
  }
}
