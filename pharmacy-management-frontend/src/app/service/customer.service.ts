import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Customer} from '../model/customer';
import {Observable} from 'rxjs';
import {environment} from '../../environments/environment';
const API_URL = `${environment.apiUrl}`;
@Injectable({
  providedIn: 'root'
})
export class CustomerService {

  constructor( private httpClient: HttpClient) { }
  getAll(): Observable<Customer[]> {
    return this.httpClient.get<Customer[]>(API_URL + '/customer?');
  }
  delete(id: number): Observable<Customer> {
    return this.httpClient.delete<Customer>(`${API_URL}/customer/${id}`);
  }
  findById(id: number): Observable<Customer> {
    return this.httpClient.get<Customer>(`${API_URL}/customer/${id}`);
  }
}
