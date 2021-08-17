import { Injectable } from '@angular/core';
import {Observable} from 'rxjs';
import {HttpClient} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class DrugClientService {
  private URl = 'http://localhost:8080/drug';

  constructor(private http: HttpClient) { }

  getAll(): Observable<any> {
    return this.http.get(`${this.URl}/not-pagination`);
  }

  searchDrug(search: any): Observable<any> {
    return this.http.get(`${this.URl}/search-drug/${search}`);
  }

  findDrugByGroup(drugGroupName: any): Observable<any> {
    return this.http.get(`${this.URl}/drug-group/${drugGroupName}`);
  }

  findDrugById(drugId: any): Observable<any> {
    return this.http.get(`${this.URl}/client/${drugId}`);
  }
}
