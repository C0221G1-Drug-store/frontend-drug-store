import {ImportBill} from './import-bill';
import {Drug} from './drug';

export interface ImportBillDrug {
  ImportBillDrugId?;
  importAmount?;
  importPrice?;
  discountRate?;
  lotNumber?;
  expiry?;
  vat?;
  importBill?: ImportBill;
  drug?: Drug;
}
