import {DrugGroup} from './drug-group';

export interface Drug {
  drugId?;
  drugCode?;
  drugName?;
  activeElement?;
  drugAmount?;
  unit?;
  conversionUnit?;
  conversionRate?;
  wholesaleProfitRate?;
  retailProfitRate?;
  drugFaculty?;
  drugSideEffect?;
  price?;
  flag?: true;
  drugGroup?: DrugGroup;
}
