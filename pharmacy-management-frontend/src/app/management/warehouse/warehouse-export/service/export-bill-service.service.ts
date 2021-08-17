import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {ExportBill} from '../model/export-bill';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ExportBillServiceService {

  API_URL = 'http://localhost:8080';

  constructor(private httpClient: HttpClient) {
  }

  getAllCaseRecord(pageNumber: number): Observable<ExportBill[]> {
    return this.httpClient.get<ExportBill[]>(this.API_URL + '/export-bill?page=' + pageNumber);
  }

  getCaseRecordById(id: number): Observable<ExportBill> {
    return this.httpClient.get<ExportBill>(this.API_URL + '/export-bill/find/' + id);
  }

  // tslint:disable-next-line:max-line-length
  getCaseRecordByFields(field1: string, field2: string, field3: string, field4: string, field5: string, pageNumber: number): Observable<ExportBill[]> {
    // tslint:disable-next-line:max-line-length
    return this.httpClient.get<ExportBill[]>(this.API_URL + '/export-bill/find/' + field1 + '/' + field2 + '/' + field3 + '/' + field4 + '/' + field5 + '?page=' + pageNumber);
  }

  delete(id: number): void {
    this.httpClient.delete(this.API_URL + '/export-bill/delete/' + id );
  }
}
