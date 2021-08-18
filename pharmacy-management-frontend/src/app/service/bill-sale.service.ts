import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {BillSale} from "../model/bill-sale";

@Injectable({
  providedIn: 'root'
})
export class BillSaleService {
  public api_url = 'http://localhost:8080/api/bill';
  public api_url2 = 'http://localhost:8080/api/bill/search';
  constructor(private http: HttpClient) { }

  getAll(page: number): Observable<BillSale[]> {
    return this.http.get<BillSale[]>(this.api_url + '?page=' + page );
  }
  findById(id: number): Observable<BillSale> {
    return this.http.get<BillSale>(`${this.api_url}/${id}`);
  }
  deleteBillSale(id: number, billSale: BillSale ): Observable<BillSale> {
    return this.http.patch<BillSale>(`${this.api_url}/${id}`, billSale);
  }


  // tslint:disable-next-line:max-line-length
  searchBillSale(search1: string, search2: string, search3: string, search4: string, search5: string, search6: string, page: number): Observable<BillSale[]> {
    // tslint:disable-next-line:max-line-length
    return this.http.get<BillSale[]>(this.api_url2 + '?search1=' + search1 + '&search2=' + search2 + '&search3=' + search3 + '&search4=' + search4 + '&search5=' + search5 + '&search6=' + search6 +'&page=' + page );
  }

}
