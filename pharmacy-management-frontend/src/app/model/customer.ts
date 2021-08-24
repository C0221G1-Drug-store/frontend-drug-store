import {CustomerGroup} from './customer-group';

export interface Customer {
  id?: number;
  address?: string;
  age?: number;
  customerCode?: string;
  name?: string;
  phone?: string;
  customerGroup?: CustomerGroup;
}
