import {Drug} from './drug';
import {Prescription} from './prescription';
import {Bill} from './bill';


export interface DrugOfBill {
  id?: number;
  quantity?: number;
  drug?: Drug;
  prescription?: Prescription;
  bill?: Bill;
}
