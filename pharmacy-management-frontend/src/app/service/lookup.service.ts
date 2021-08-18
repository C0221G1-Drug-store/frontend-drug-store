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

  getCustomersByKeyWord(attribute: string, keyWord: string, page: string): Observable<any> {
    return this.http.get(`${this.URl}/customer/search/${attribute}/${keyWord}/${page}`);
  }

  getCustomerGroups(): Observable<CustomerGroupLookup[]> {
    return this.http.get<CustomerGroupLookup[]>(`${this.URl}/customerGroup`);
  }

  getManufacturerByKeyWord(attribute: string, keyWord: string, page: string): Observable<any> {
    return this.http.get(`${this.URl}/manufacturer/search/${attribute}/${keyWord}/${page}`);
  }
}
