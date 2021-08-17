import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ExportbillService {
  private API_EXPORT_BILL = "http://localhost:8080/api/export-bill";
  constructor(private http: HttpClient) { }

  // @ts-ignore
  createCodeExportBillRefund(): Observable<any> {
    return this.http.get(`${this.API_EXPORT_BILL}/createCode`);
  }
}
