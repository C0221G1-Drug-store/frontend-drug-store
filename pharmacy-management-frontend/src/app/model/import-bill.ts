import {Manufacturer} from "./manufacturer";

export interface ImportBill {
  importBillId?;
  importSystemCode?;
  accountingVoucher?;
  invoiceDate?;
  invoiceTime?;
  flag?: true;
  payment?: string;
  manufacturer?: Manufacturer;
  employee?;
}
