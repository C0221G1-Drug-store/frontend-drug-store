import {Drug} from './drug';
import {PrescriptionDto} from './prescriptionDto';
import {Bill} from './bill';


export interface DrugOfBill {
  id?: number;
  quantity?: number;
  drug?: Drug;
  prescription?: PrescriptionDto;
  bill?: Bill;
}
