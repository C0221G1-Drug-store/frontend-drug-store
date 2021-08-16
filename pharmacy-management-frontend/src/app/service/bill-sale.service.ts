import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Drug} from '../model/drug';
import {Employee} from '../model/employee';
import {Customer} from '../model/customer';
import {BillSale} from '../model/bill-sale';
import {DrugOfBill} from '../model/drug-of-bill';

@Injectable({
  providedIn: 'root'
})
export class BillSaleService {
  private API_URL = 'http://localhost:8080/bill-sale';

  constructor(private http: HttpClient) {
  }

  getListDrug(): Observable<Drug[]> {
    return this.http.get<Drug[]>(this.API_URL + '/get-list-drug');
  }

  getListEmployee(): Observable<Employee[]> {
    return this.http.get<Employee[]>(this.API_URL + '/get-list-employee');
  }

  getListCustomer(): Observable<Customer[]> {
    return this.http.get<Customer[]>(this.API_URL + '/get-list-customer');
  }

  getBillSaleById(id: number): Observable<BillSale> {
    return this.http.get<BillSale>(this.API_URL + '/get-bill-sale/' + id);
  }

  createBillSale(billSale: BillSale): Observable<BillSale> {
    return this.http.post<BillSale>(this.API_URL + '/create-bill-sale', billSale);
}

  createDrugOfBill(drugOfBill: DrugOfBill): Observable<DrugOfBill> {
    return this.http.post<DrugOfBill>(this.API_URL + '/create-drug-of-bill', drugOfBill);
  }
}
