import { Payment } from './payment';

export interface ImportBill {
   importBillId?;
   importSystemCode?;
   accountingVoucher?;
   invoiceDate?;
   flag?: true;
   payment?: Payment ;
   manufacturer?;
   employee?;
}
