import { Injectable } from '@angular/core';
import {Observable} from 'rxjs';
import {HttpClient} from '@angular/common/http';

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
  deleteDrug(id: number): Observable<any> {
    return this.http.delete(`${this.URl}/delete/${id}`);
  }
  getDrugById(id: number): Observable<any> {
    return this.http.get(`${this.URl}/${id}`);
  }
}
