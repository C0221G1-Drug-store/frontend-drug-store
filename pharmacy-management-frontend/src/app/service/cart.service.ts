import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CartService {
  // API_URL = 'http://api.exchangeratesapi.io/v1/latest?access_key=9dae1030427407802f422bf0524ac146';
  API_URL = '';
  constructor(private http: HttpClient) {
  }

  convertUsdCurrency(): Observable<any> {
    return this.http.get(this.API_URL);
  }
}
