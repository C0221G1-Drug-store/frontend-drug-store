import { Injectable } from '@angular/core';
import {Observable} from 'rxjs';
import {HttpClient} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class DrugService {
  private URl = 'http://localhost:8080/api/drugs';

  constructor(private http: HttpClient) { }

  getAll(): Observable<any> {
    return this.http.get(this.URl);
  }
  getById(id): Observable<any> {
    return this.http.get(`${this.URl}/${id}`);
  }
}
