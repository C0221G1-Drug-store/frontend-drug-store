import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {ExportBill} from "../model/export-bill";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class ExportBillServiceService {

  API_URL = 'http://localhost:8080';

  constructor(private httpClient: HttpClient) { }

  getAllCaseRecord(): Observable<ExportBill[]> {
    return this.httpClient.get<ExportBill[]>(this.API_URL + '/export-bill');
  }
}
