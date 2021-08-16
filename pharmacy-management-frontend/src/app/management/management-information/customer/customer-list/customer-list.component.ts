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
  page = 1;
  pageSize = 5;
  collectionSize = 0;
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
      this.customers = data['content'];
      this.collectionSize = data['totalPages'];
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
    this.customerService.searchAllField(keyword).subscribe(data => {
      if (data == null) {
        this.customers = [];
      } else {
        this.customers = data['content'];
        this.collectionSize = data['totalPages'];
      }
    }, error => {
      console.log(error);
    });
  }

  sort( typeSort: string) {

  }
}
