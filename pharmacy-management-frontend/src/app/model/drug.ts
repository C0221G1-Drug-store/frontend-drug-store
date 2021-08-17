import {DrugGroup} from './drugGroup';

export interface Drug {
  drugId?: number;
  drugCode?: number;
  drugName?: string;
  drugFaculty?: string;
  activeElement?: string;
  drugImageDetails?: string;
  unit?: string;
  conversionUnit?: string;
  conversionRate?: string;
  wholesaleProfitRate?: number;
  retailProfitRate?: number;
  manufacturer?: string;
  origin?: string;
  note?: string;
  drugSideEffect?: string;
  drugGroup?: DrugGroup;
  flag?: boolean;
}
