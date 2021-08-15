import {ExportBill} from "./export-bill";
import {DrugImportBill} from "../import-bill/drug-import-bill";

export interface ExportBillDetail {
  exportBillDetailId ?: number;
  exportBill ?: ExportBill;
  importBillDrug ?: DrugImportBill;
}
