import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {CustomerGroupLookup} from '../model/lookup/customer-group-lookup';
import {CustomerLookup} from '../model/lookup/customer-lookup';
import {ManufacturerLookup} from '../model/lookup/manufacturer-lookup';

@Injectable({
  providedIn: 'root'
})
export class LookupService {
  private URl = 'http://localhost:8080';
  constructor(private http: HttpClient) { }

  getCustomersByKeyWord(attribute: string, keyWord: string): Observable<CustomerLookup[]> {
    return this.http.get<CustomerLookup[]>(`${this.URl}/customer/search/${attribute}/${keyWord}`);
  }
  getCustomerGroups(): Observable<CustomerGroupLookup[]> {
    return this.http.get<CustomerGroupLookup[]>(`${this.URl}/customerGroup`);
  }

  getManufacturerByKeyWord(attribute: string, keyWord: string): Observable<ManufacturerLookup[]> {
    return this.http.get<ManufacturerLookup[]>(`${this.URl}/manufacturer/search/${attribute}/${keyWord}`);
  }
}
