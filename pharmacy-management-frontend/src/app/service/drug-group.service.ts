import { Injectable } from '@angular/core';
import {environment} from "../../environments/environment";
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {DrugGroup} from "../model/drug-group";
const API_URL = `${environment.apiUrl}`;
@Injectable({
  providedIn: 'root'
})
export class DrugGroupService {

  constructor(private http: HttpClient) {
  }

  getAll(): Observable<DrugGroup[]> {
    return this.http.get<DrugGroup[]>(`${API_URL}/drugGroup`);
  }
  getAllPage(num: number): Observable<DrugGroup[]> {
    return this.http.get<DrugGroup[]>(`${API_URL}/drugGroup/page`+'?page='+num);
  }
  save(drugGroup): Observable<DrugGroup> {
    return this.http.post<DrugGroup>(`${API_URL}/drugGroup/create`, drugGroup);
  }

  update(drugGroupId: number, drugGroup: DrugGroup): Observable<DrugGroup> {
    return this.http.put<DrugGroup>(`${API_URL}/drugGroup/edit/${drugGroupId}`, drugGroup);
  }

  delete(drugGroupId: number): Observable<DrugGroup> {
    // @ts-ignore
    return this.http.patch<DrugGroup>(`${API_URL}/drugGroup/delete/${drugGroupId}`);
  }

}
