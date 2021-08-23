import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {BillSale} from '../model/billSale';
import { DrugOfBill } from '../model/drug-of-bill';

@Injectable({
  providedIn: 'root'
})
export class PrescriptionService {
  private URL = 'http://localhost:8080/prescription';
  private URL1 = 'http://localhost:8080/drug-of-bill';

  constructor(private http: HttpClient) { }
  getAll(): Observable<any> {
    return this.http.get(this.URL);
  }

  findAll(id: number): Observable<any> {
    return this.http.get(`${this.URL1}/${id}`);

  }

  findPrescriptionById(id: number): Observable<any> {
    return  this.http.get(`${this.URL}/${id}`);
  }
  saveBIll(bill: BillSale): Observable<any> {
    return this.http.post(this.URL + '/bill', bill);
    console.log(bill);
  }

  search(fieldSearch: string, valueSearch: string): Observable<any> {
    return this.http.get(this.URL + '/search/?fieldSearch=' + fieldSearch + '&valueSearch=' + valueSearch);
  }

  save(drugOfBill1: DrugOfBill): Observable<any> {
    return this.http.post(this.URL + '/save', drugOfBill1);
  }
  findNewBill(): Observable<any> {
    return this.http.get(this.URL + '/find-bill');
  }
}
