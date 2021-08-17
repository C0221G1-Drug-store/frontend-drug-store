import { Injectable } from '@angular/core';
import {Customer} from '../../../model/customer';

@Injectable({
  providedIn: 'root'
})
export class CustomerServiceService {

  constructor() { }

  saveCustomer(customer: Customer) {
    return null;
  }

  edit(temp: any) {
    return null;
  }
}
