import { Injectable } from '@angular/core';
import {Observable} from 'rxjs';
import {HttpClient} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class DrugService {
  private URl = 'http://localhost:8080/drug';

  constructor(private http: HttpClient) { }

  getAllDrugsSearch(field: string, sign: string, input: string, index: number): Observable<any> {
    return this.http.get(this.URl + '/search?field=' + field + '&sign=' + sign + '&input=' + input + '&index=' + index);
  }
  getAllDrugsSearchNotPagination(field: string, sign: string, input: string): Observable<any> {
    return this.http.get(this.URl + '/search-not-pagination?field=' + field + '&sign=' + sign + '&input=' + input);
  }
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
