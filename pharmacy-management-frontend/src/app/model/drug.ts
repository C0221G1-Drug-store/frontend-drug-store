import {DrugGroup} from './drug-group';
import {Image_detail} from './image_detail';

export interface Drug {
  drugId?: number;
  drugCode?: string;
  drugName?: string;
  activeElement?: string;
  drugAmount?: number;
  unit?: string;
  conversionUnit?: string;
  conversionRate?: number;
  wholesaleProfitRate?: number;
  retailProfitRate?: number;
  drugFaculty?: string;
  manufacturer?: string;
  origin?: string;
  note?: string;
  drugSideEffect?: string;
  flag?: true;
  drugGroup?: any;
  wholesalePrice?: number;
  retailPrice?: number;
  drugImageDetails?: Image_detail[];
}
