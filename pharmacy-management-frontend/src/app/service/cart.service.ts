import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {DrugCartBackend} from "../model/cart/drug-cart-backend";

@Injectable({
  providedIn: 'root'
})
export class CartService {
  // API_URL = 'http://api.exchangeratesapi.io/v1/latest?access_key=9dae1030427407802f422bf0524ac146';
  API_URL = '';
  API_EMAIL = 'http://localhost:8080/email/send';
  API_BACKEND = 'http://localhost:8080/drug/cart';
  constructor(private http: HttpClient) {
  }

  convertUsdCurrency(): Observable<any> {
    return this.http.get<any>(this.API_URL);
  }

  sendEmail(){
      return  this.http.get(this.API_EMAIL);
  }

  findDrugCartById(id: number): Observable<DrugCartBackend> {
    return this.http.get<DrugCartBackend>(`${this.API_BACKEND}/${id}`)
  }
}
