import {CustomerGroupLookup} from './customer-group-lookup';

export interface CustomerLookup {
  // customerCode?: string;
  // customerName?: string;
  // customerAge?: string;
  // customerAddress?: string;
  // customerPhone?: string;
  // customers?: CustomerLookup;
  // customerNote?: string;

  customerAddress?: string;
  customerAge?: number;
  customerCode?: string;
  customerId?: number;
  customerName?: string;
  customerNote?: string;
  customerPhone?: string;
  customers?: CustomerGroupLookup
  flag?: boolean;
}
