import { Injectable } from '@angular/core';
import {Observable} from "rxjs";
import {HttpClient} from '@angular/common/http';
import {ExportBill} from "../model/export-bill/export-bill";
import {ExportBillDetail} from "../model/export-bill/export-bill-detail";

@Injectable({
  providedIn: 'root'
})
export class ExportBillService {
  private URL = 'http://localhost:8080';
  constructor(private http: HttpClient) { }
  getListDrugImportBill(): Observable<any>{
    return this.http.get<any>(this.URL+'/drug-import-bills');
  }
  findDrugById(id : number): Observable<any>{
    return this.http.get(this.URL+'/drug-import-bills/'+id);
  }
  getExportBillType(): Observable<any>{
    return this.http.get<any>(this.URL+'/export-bill-types');
  }
  createExportBill(exportBill: ExportBill): Observable<any>{
    return this.http.post<any>(this.URL+ '/export-bills',exportBill);
  }
  createExportBillDetail(exportBillDetail : ExportBillDetail): Observable<any>{
    return this.http.post<any>(this.URL+ '/export-bill-details',exportBillDetail);
  }
}
