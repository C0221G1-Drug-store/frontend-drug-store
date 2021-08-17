import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Prescription} from '../model/prescription';

const API_URL = 'http://localhost:8080';

@Injectable({
  providedIn: 'root'
})
export class PrescriptionService {
  constructor(private http: HttpClient) {
  }

  getAllPrescription(name: string, code: string, object: string, symptom: string, page: number, sortBy: string) {
    // tslint:disable-next-line:max-line-length
    return this.http.get<Prescription[]>(API_URL + '/prescriptions/prescription-list' + '?prescriptionName=' + name + '&prescriptionCode=' + code + '&object=' + object + '&symptom=' + symptom + '&page=' + page + '&sortBy=' + sortBy);
  }

  savePrescription(prescription): Observable<Prescription> {
    return this.http.post<Prescription>(API_URL + '/prescriptions/prescription-create', prescription);
  }

  findById(id: number): Observable<Prescription> {
    return this.http.get<Prescription>(`${API_URL}/prescriptions/prescriptions/${id}`);
  }

  updatePrescription(id: number, prescription: Prescription): Observable<Prescription> {
    return this.http.put<Prescription>(`${API_URL}/prescriptions/${id}`, prescription);
  }

  deletePrescription(id: number): Observable<Prescription> {
    return this.http.delete<Prescription>(`${API_URL}/prescriptions/prescriptions/${id}`);
  }

  // pagePrescription(name,)
}
