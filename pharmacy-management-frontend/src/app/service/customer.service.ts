import {Injectable} from '@angular/core';
import {HttpClient, HttpErrorResponse, HttpHeaders} from '@angular/common/http';
import {Customer} from '../model/customer';
import {Observable, throwError} from 'rxjs';
import {environment} from '../../environments/environment';
import {CustomerGroup} from '../model/CustomerGroup';
import {catchError} from 'rxjs/operators';
import {CustomerDto} from '../model/customer-dto';

const API_URL = `${environment.apiUrl}`;

const headerDict = {
  'Content-Type': 'application/json',
  Accept: 'application/json',
  'Access-Control-Allow-Headers': 'Content-Type',
  'Access-Control-Allow-origin': '*'
};

const requestOptions = {
  headers: new  HttpHeaders(headerDict),
};
@Injectable({
  providedIn: 'root'
})
export class CustomerService {
  private handleError(httpError: HttpErrorResponse) {
    let message = '';
    if (httpError.error instanceof ProgressEvent) {
      console.log('in progrss event');
      message = 'lỗi mạng';
    } else {
      message = JSON.parse(httpError.error).message;
      // The backend returned an unsuccessful response code.
      // The response body may contain clues as to what went wrong.
      console.error(
        `lỗi server ${httpError.status}, ` +
        `body was: ${httpError.error}`);
    }
    // Return an observable with a user-facing error message.
    return throwError(
      'Bạn không đủ quyền để truy cập vào trang này ' + message);
  }

  constructor(private httpClient: HttpClient) {
  }
  // getAll(): Observable<CustomerGroup[]> {
  //   return this.httpClient.get<CustomerGroup[]>(API_URL + '/customer-group', requestOptions);
  // }
  saveCustomer(customer): Observable<CustomerDto> {
    return this.httpClient.post<CustomerDto>(API_URL + '/customer/create', customer).pipe(catchError(this.handleError));
  }

  updateUser(id: number, customer: CustomerDto): Observable<CustomerDto> {
    return this.httpClient.patch<CustomerDto>(`${API_URL}/customer/user-update/${id}`, customer).pipe(catchError(this.handleError));
  }
  getCustomerGroup(): Observable<CustomerGroup[]> {
    return this.httpClient.get<CustomerGroup[]>(API_URL + '/customer/customer-group', requestOptions);
  }
  getCustomerByPagination(index: number): Observable<Customer[]> {
    return this.httpClient.get<Customer[]>(API_URL + '/customer?index=' + index);
  }

  delete(id: number): Observable<Customer> {
    return this.httpClient.delete<Customer>(`${API_URL}/customer/${id}`);
  }

  findById(id: number): Observable<Customer> {
    return this.httpClient.get<Customer>(`${API_URL}/customer/${id}`);
  }

  updateStatusDelete(id: number, customer: Customer): Observable<Customer> {
    return this.httpClient.patch<Customer>(`${API_URL}/customer/${id}`, customer);
  }

  searchAllField(keyword: string): Observable<Customer[]> {
    return this.httpClient.get<Customer[]>(`${API_URL}/customer/search/${keyword}`);
  }

  searchByCustomerCode(keyword: string): Observable<Customer[]> {
    return this.httpClient.get<Customer[]>(`${API_URL}/customer/searchField/customerCode/${keyword}`);
  }

  searchByCustomerGroup(keyword: string): Observable<Customer[]> {
    return this.httpClient.get<Customer[]>(`${API_URL}/customer/searchField/customerGroup/${keyword}`);
  }

  searchByCustomerName(keyword: string): Observable<Customer[]> {
    return this.httpClient.get<Customer[]>(`${API_URL}/customer/searchField/customerName/${keyword}`);
  }

  searchByCustomerAddress(keyword: string): Observable<Customer[]> {
    return this.httpClient.get<Customer[]>(`${API_URL}/customer/searchField/customerAddress/${keyword}`);
  }

  searchByCustomerPhone(keyword: string): Observable<Customer[]> {
    return this.httpClient.get<Customer[]>(`${API_URL}/customer/searchField/customerPhone/${keyword}`);
  }

  edit(temp: any, id: number) {
    return null;
  }
}
