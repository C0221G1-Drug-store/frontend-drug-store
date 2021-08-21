import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {PrescriptionDto} from '../model/prescriptionDto';
import {Indicative} from '../model/indicative';

const API_URL = 'http://localhost:8080';

@Injectable({
  providedIn: 'root'
})
export class PrescriptionService {
  constructor(private http: HttpClient) {
  }

  getAllPrescription(name: string, code: string, object: string, symptom: string, page: number, sortBy: string): Observable<any> {
    // tslint:disable-next-line:max-line-length
    return this.http.get(API_URL + '/prescriptions/prescription-list' + '?prescriptionName=' + name + '&prescriptionCode=' + code + '&object=' + object + '&symptom=' + symptom + '&page=' + page + '&sortBy=' + sortBy);
  }

  savePrescription(prescription): Observable<PrescriptionDto> {
    return this.http.post<PrescriptionDto>(API_URL + '/prescriptions/prescription-create', prescription);
  }

  findById(id: number): Observable<PrescriptionDto> {
    return this.http.get<PrescriptionDto>(`${API_URL}/prescriptions/prescriptions/${id}`);
  }

  updatePrescription(id: number, prescription: PrescriptionDto): Observable<PrescriptionDto> {
    return this.http.put<PrescriptionDto>(`${API_URL}/prescriptions/prescription-edit/${id}`, prescription);
  }

  deletePrescription(id: number): Observable<PrescriptionDto> {
    return this.http.delete<PrescriptionDto>(`${API_URL}/prescriptions/prescription-delete/${id}`);
  }

  getIdicative(id: number): Observable<Indicative[]> {
    return this.http.get<Indicative[]>(`${API_URL}/indicatives/indicative-list/${id}`);
  }
}
