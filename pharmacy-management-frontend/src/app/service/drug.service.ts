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


  save(drug: Drug): Observable<any> {
    return this.http.post<any>(this.URl, drug);
  }
  saveImage(drugImage: any): Observable<any> {
    return this.http.post<any>(this.URl+'/image', drugImage);
  }
  update(id: number, code: number, drug: Drug): Observable<any> {
    return this.http.put<any>(`${this.URl}/${id}&${code}`, drug);
  }
}
