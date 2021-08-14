import {ExportBillType} from "./export-bill-type";

export interface ExportBill {
  exportBillId: number;
  exportBillCode: string;
  exportBillDateCreate: string;
  exportBillReason: string;
  exportBillType: ExportBillType;
  // employee: Employee;
  // manufacturer: Manufacturer;
}
