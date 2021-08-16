import {Drug} from './drug';
import {Prescription} from './prescription';
import {BillSale} from './bill-sale';


export interface DrugOfBill {
  drugOfBillId?: number;
  quantity?: number;
  drug?: Drug;
  prescription?: Prescription;
  billSale?: BillSale;
}
