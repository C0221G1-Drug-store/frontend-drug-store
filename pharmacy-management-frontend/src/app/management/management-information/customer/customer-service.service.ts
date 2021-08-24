// import {Injectable} from '@angular/core';
// import {HttpClient} from '@angular/common/http';
// import {Customer} from '../model/customer';
// import {Observable} from 'rxjs';
// import {environment} from '../../environments/environment';
//
// const API_URL = `${environment.apiUrl}`;
//
// @Injectable({
//   providedIn: 'root'
// })
// export class CustomerService {
//
//   constructor(private httpClient: HttpClient) {
//   }
//
//
//
//   getAll(): Observable<Customer[]> {
//     return this.httpClient.get<Customer[]>(API_URL + '/customer/all');
//   }
//
//   getCustomerByPagination(index: number): Observable<Customer[]> {
//     return this.httpClient.get<Customer[]>(API_URL + '/customer?index=' + index);
//   }
//
//   delete(id: number): Observable<Customer> {
//     return this.httpClient.delete<Customer>(`${API_URL}/customer/${id}`);
//   }
//
//   findById(id: number): Observable<Customer> {
//     return this.httpClient.get<Customer>(`${API_URL}/customer/${id}`);
//   }
//
//   updateStatusDelete(id: number, customer: Customer): Observable<Customer> {
//     return this.httpClient.patch<Customer>(`${API_URL}/customer/${id}`, customer);
//   }
//
//   searchAllField(keyword: string): Observable<Customer[]> {
//     return this.httpClient.get<Customer[]>(`${API_URL}/customer/search/${keyword}`);
//   }
//
//   searchByCustomerCode(keyword: string): Observable<Customer[]> {
//     return this.httpClient.get<Customer[]>(`${API_URL}/customer/searchField/customerCode/${keyword}`);
//   }
//
//   searchByCustomerGroup(keyword: string): Observable<Customer[]> {
//     return this.httpClient.get<Customer[]>(`${API_URL}/customer/searchField/customerGroup/${keyword}`);
//   }
//
//   searchByCustomerName(keyword: string): Observable<Customer[]> {
//     return this.httpClient.get<Customer[]>(`${API_URL}/customer/searchField/customerName/${keyword}`);
//   }
//
//   searchByCustomerAddress(keyword: string): Observable<Customer[]> {
//     return this.httpClient.get<Customer[]>(`${API_URL}/customer/searchField/customerAddress/${keyword}`);
//   }
//
//   searchByCustomerPhone(keyword: string): Observable<Customer[]> {
//     return this.httpClient.get<Customer[]>(`${API_URL}/customer/searchField/customerPhone/${keyword}`);
//   }
// }
