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

  getAllPrescription() {
    return this.http.get<Prescription[]>(API_URL + '/prescriptions/prescription-list');
  }


  savePrescription(prescription): Observable<Prescription> {
    return this.http.post<Prescription>(API_URL + '/prescriptions/prescription-create', prescription);
  }

  findById(id: number): Observable<Prescription> {
    return this.http.get<Prescription>(`${API_URL}/prescription/${id}`);
  }

  updatePrescription(prescription: Prescription): Observable<Prescription> {
    return this.http.put<Prescription>(`${API_URL}/prescription/${prescription.prescriptionId}`, prescription);
  }

  deletePrescription(id: number): Observable<Prescription> {
    return this.http.delete<Prescription>(`${API_URL}/prescription/${id}`);
  }
}
