import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Manufacturer} from '../model/manufacturer';
import {environment} from '../../environments/environment';
import {Observable} from 'rxjs';

const API_URL = `${environment.apiUrl}`;

@Injectable({
  providedIn: 'root'
})

export class ManufacturerService {
  headers = new HttpHeaders({  Accept : 'application/json; charset=utf-8', 'Content-Type': 'application/json; charset=utf-8'});
  constructor(private http: HttpClient) { }
  getAll(page: number, search: any, selects: any, sort: any) {

    if (selects === 'name') {
      return this.http.get<Manufacturer[]>(API_URL + '/manufacturer/list?page=' + page + '&name=' + search);
    } else if (selects == 'address') {
      return this.http.get<Manufacturer[]>(API_URL + '/manufacturer/list?page=' + page + '&address=' + search);
    } else if (selects == 'phoneNumber') {
      return this.http.get<Manufacturer[]>(API_URL + '/manufacturer/list?page=' + page + '&phoneNumber=' + search);
    } else if (selects == 'note') {
      return this.http.get<Manufacturer[]>(API_URL + '/manufacturer/list?page=' + page + '&note=' + search);
    } else if (selects == 'code') {
      return this.http.get<Manufacturer[]>(API_URL + '/manufacturer/list?page=' + page + '&code=' + search);
    }
    if (sort != null) {
      switch (sort) {
        case 'name': {
          return this.http.get<Manufacturer[]>(API_URL + '/manufacturer/list?page=' + page + '&sort=name');
          break;
        }
        case 'address': {
          return this.http.get<Manufacturer[]>(API_URL + '/manufacturer/list?page=' + page + '&sort=address');
          break;
        }
        case 'note': {
          return this.http.get<Manufacturer[]>(API_URL + '/manufacturer/list?page=' + page + '&sort=note');
          break;
        }
        case 'code': {
          return this.http.get<Manufacturer[]>(API_URL + '/manufacturer/list?page=' + page + '&sort=code');
          break;
        }
        case 'phoneNumber': {
          return this.http.get<Manufacturer[]>(API_URL + '/manufacturer/list?page=' + page + '&sort=phoneNumber');
          break;
        }
        default: {
          return this.http.get<Manufacturer[]>(API_URL + '/manufacturer/list?page=' + page);
        }
      }
    } else {
      return this.http.get<Manufacturer[]>(API_URL + '/manufacturer/list?page=' + page);
    }
  }
  updateManufacturer(id: number, manufacturer: Manufacturer): Observable<Manufacturer> {
    return  this.http.put<Manufacturer>(API_URL + '/manufacturer/update?id=' + id, manufacturer);

  }
  saveManufacturer(manufacturer: Object): Observable<Object> {
    return this.http.post<Object>(API_URL + '/manufacturer/create', manufacturer,  { headers: this.headers });
  }
  deleteManufacturer(id: number) {
    return this.http.delete<Object>(API_URL + '/manufacturer/delete?id=' + id);
  }
  findByIdManufacture(id: number) {
    return this.http.get<Object>(API_URL + '/manufacturer/show?id=' + id);
  }
  findAllNormal(): Observable<Manufacturer[]>{
    return this.http.get<Manufacturer[]>(API_URL + '/manufacturer');
  }
}

