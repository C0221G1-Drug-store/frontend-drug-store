import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {ExportBill} from '../../model/export-bill/exportBill';
import {ExportBillDetails} from '../../model/export-bill/exportBillDetails';

@Injectable({
  providedIn: 'root'
})
export class ExportbillService {
  private API_EXPORT_BILL = "http://localhost:8080/api/export-bill";
  private API_EMPLOYEE = "http://localhost:8080/api";
  constructor(private http: HttpClient) { }

  createCodeExportBillRefund(): Observable<any> {
    return this.http.get(`${this.API_EXPORT_BILL}/createCode`);
  }
  createCodeExportBillDestroy(): Observable<any> {
    return this.http.get(`${this.API_EXPORT_BILL}/create-code-destroy`);
  }

  createExportBill(exportBill: ExportBill): Observable<any>{
    return this.http.post<any>(this.API_EXPORT_BILL,exportBill);
  }

  createExportBillDetail(exportBillDetail : ExportBillDetails): Observable<any>{
    return this.http.post<any>(this.API_EXPORT_BILL+ '/export-bill-detail',exportBillDetail);
  }

  getEmployee():Observable<any>{
    return this.http.get<String>(this.API_EMPLOYEE+ '/employees');
  }

}
