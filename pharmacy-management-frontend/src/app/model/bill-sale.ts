export interface BillSale {
  billSaleId?: number;
  billSaleCode?: string;
  billSaleType?: string;
  invoiceDate?: string;
  date?: string;
  time?: string;
  billSaleNote?: string;
  totalMoney?: number;
  flag?: boolean;
  customer: Customer;
  employee: Employee;
}
