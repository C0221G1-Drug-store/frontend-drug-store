import {Drug} from "../drug";
import {ImportBill} from "./import-bill";

export interface DrugImportBill {
  importBillDrugId?;
  importAmount?;
  importPrice?;
  discountRate?;
  lotNumber?;
  expiry?;
  vat?;
  importBill?: ImportBill;
  drug?: Drug;
}
