import { Injectable } from '@angular/core';
import {environment} from "../../../environments/environment";
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";

const API_URL = `${environment.apiUrl}`;
@Injectable({
  providedIn: 'root'
})
export class UserRoleService {

  constructor(private http: HttpClient) { }

  updateAccount(id: number, userRole: any): Observable<any> {
    return this.http.put<any>(`${API_URL}/users/editUserRole/${id}`, userRole);
  }
}
