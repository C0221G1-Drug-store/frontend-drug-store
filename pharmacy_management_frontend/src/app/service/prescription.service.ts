import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PrescriptionService {
  private URL = 'http://localhost:8080/prescription';
  private URL1 = 'http://localhost:8080/drug-of-bill';

  constructor(private http: HttpClient) { }
  getAll(): Observable<any> {
    return this.http.get(this.URL);
  }

  findAll(id: number): Observable<any> {
    return this.http.get(`${this.URL1}/${id}`);

  }

  findPrescriptionById(id: number): Observable<any> {
    return  this.http.get(`${this.URL}/${id}`);
  }
}
