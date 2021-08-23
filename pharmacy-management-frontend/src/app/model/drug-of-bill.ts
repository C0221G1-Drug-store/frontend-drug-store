import {Drug} from './drug';
import {Prescription} from './prescription';
import {BillSale} from './billSale';


export interface DrugOfBill {
  id?: number;
  quantity?: number;
  drug?: Drug;
  prescription?: Prescription;
  bill?: BillSale;
}
