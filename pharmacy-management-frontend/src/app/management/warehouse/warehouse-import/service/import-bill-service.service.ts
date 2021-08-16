import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {ImportBill} from '../model/import-bill';

const API_URL = 'http://localhost:8080/';

@Injectable({
  providedIn: 'root'
})
export class ImportBillServiceService {

  constructor(private http: HttpClient) {
  }

  getAll(): Observable<ImportBill[]> {
    return this.http.get<ImportBill[]>(API_URL + 'api/import-bills/list');
  }

  getAllImportBill(index: number): Observable<ImportBill[]> {
    return this.http.get<ImportBill[]>(API_URL + 'api/import-bills/list?index=' + index);
  }

  getAllImportBillNotPagination(): Observable<ImportBill[]> {
    return this.http.get<ImportBill[]>(API_URL + 'api/import-bills/not-pagination');
  }

  searchImportBill(importCode: string): Observable<ImportBill[]> {
    return this.http.get<ImportBill[]>(API_URL + 'api/import-bills/search?importCode=' + importCode);
  }

  searchBill(codeBill: string, startDate: string, endDate: string): Observable<ImportBill[]> {
    return this.http.get<ImportBill[]>(API_URL + 'api/import-bills/search-bills/' + codeBill + '/' + startDate + '/' + endDate);
  }
}
