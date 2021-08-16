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

  getAllPagination(index: number): Observable<any> {
    return this.http.get(this.URl + '?index=' + index);
  }

  getAll(): Observable<any> {
    return this.http.get(this.URl + '/not-pagination');

  }
  save(drug: Drug): Observable<any> {
    return this.http.post<any>(this.URl, drug);
  }

}
