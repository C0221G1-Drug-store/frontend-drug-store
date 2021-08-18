import { Injectable } from '@angular/core';
import {Observable} from 'rxjs';
import {HttpClient} from '@angular/common/http';
import {Drug} from '../model/drug';

@Injectable({
  providedIn: 'root'
})

export class DrugService {
  private URl = 'http://localhost:8080/drug';

  constructor(private http: HttpClient) { }

  getAll(): Observable<any> {
    return this.http.get(this.URl);
  }

  searchDrug(search: any): Observable<any> {
    return this.http.get(`${this.URl}/search/${search}`);
  }

  findDrugByGroup(drugGroupId: number): Observable<any> {
    return this.http.get(`${this.URl}/drug-group/${drugGroupId}`);
  }
  findById(id:number):Observable<Drug> {
    return this.http.get(`${this.URl}/${id}`)
  }
}
