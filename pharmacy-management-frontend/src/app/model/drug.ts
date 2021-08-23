import {DrugGroup} from './drug-group';

export interface Drug {
  drugId?: number;
  drugCode?: number;
  drugName?: string;
  drugFaculty?: string;
  activeElement?: string;
  unit?: string;
  conversionUnit?: string;
  conversionRate?: string;
  wholesaleProfitRate?: number;
  retailProfitRate?: number;
  manufacturer?: string;
  origin?: string;
  note?: string;
  drugSideEffect?: string;
  drugGroup?: any;
  flag?: boolean;
  drugAmount?: number;
  wholesalePrice?: number;
  retailPrice?: number;
  drugImageDetails?: string;
}
