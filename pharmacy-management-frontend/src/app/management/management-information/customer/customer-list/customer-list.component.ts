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
  indexPagination = 1;
  totalPagination: number;
  id: number;
  customerDelete: Customer;
  customers: Customer[] = [];
  customersPagination: Customer[] = [];
  typeSort: string;

  constructor(private customerService: CustomerService,
  ) {
  }

  ngOnInit(): void {
    this.getCustomerByPagination();
    this.getAllCustomer();
  }

  getAllCustomer() {
    this.customerService.getAll().subscribe(data => {
      this.customers = data;
      if ((this.customers.length % 5) !== 0) {
        this.totalPagination = (Math.round((this.customers.length / 5) + 0.4999999));
      }
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

  chooseTypeSearch(typeSearch: string, keyword: string) {
    if (keyword !== '') {
      switch (typeSearch) {
        case'customer_code':
          this.customerService.searchByCustomerCode(0, keyword).subscribe(data => {
            this.customersPagination = data;
          });
          break;
        case'customer_group':
          this.customerService.searchByCustomerGroup(0, keyword).subscribe(data => {
            this.customersPagination = data;
          });
          break;
        case'customer_name':
          this.customerService.searchByCustomerName(0, keyword).subscribe(data => {
            this.customersPagination = data;
          });
          break;
        case'customer_address':
          this.customerService.searchByCustomerAddress(0, keyword).subscribe(data => {
            this.customersPagination = data;
          });
          break;
        case'customer_phone':
          this.customerService.searchByCustomerPhone(0, keyword).subscribe(data => {
            this.customersPagination = data;
          });
          break;
      }
    } else {
      this.getCustomerByPagination();
    }
  }

///// phân trang
  getCustomerByPagination() {
    this.customerService.getCustomerByPagination(0).subscribe(data => {
      this.customersPagination = data;
    });
  }

  getCustomerByPaginationStep2() {
    this.customerService.getCustomerByPagination((this.indexPagination * 5) - 5).subscribe(data => {
      this.customersPagination = data;
    });
  }

  firstPage() {
    this.indexPagination = 1;
    this.getCustomerByPagination();
  }

  nextPage() {
    this.indexPagination += 1;
    if (this.indexPagination > this.totalPagination) {
      this.indexPagination = this.indexPagination - 1;
    }
    this.getCustomerByPaginationStep2();
  }

  previousPage() {
    this.indexPagination -= 1;
    if (this.indexPagination === 0) {
      this.indexPagination = 1;
      this.getCustomerByPagination();
    } else {
      this.getCustomerByPaginationStep2();
    }
  }

  lastPage() {
    this.indexPagination = this.totalPagination;
    this.getCustomerByPaginationStep2();
  }
}
