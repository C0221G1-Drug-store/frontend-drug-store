import {Employee} from "../employee/employee";
import {Manufacturer} from "../manufacturer/manufacturer";
import {ExportBillType} from "./export-bill-type";

export interface ExportBill {
  exportBillId?:number;
  exportBillCode?:string;
  exportBillDate?: string;
  exportBillReason ?: string;
  exportBillAddress?: string;
  exportBillType?:ExportBillType;
  employee?:Employee;
  manufacturer?: Manufacturer;
}
