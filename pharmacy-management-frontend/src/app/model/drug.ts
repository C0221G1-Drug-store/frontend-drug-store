export interface Drug {
  drugId?: number;
  drugCode?: string;
  drugName?: string;
  drugIngredient?: string;
  activeElement?: string;
  drugAmount?: number;
  unit?: string;
  conversionUnit?: string;
  conversionRate?: string;
  wholesaleProfitRate?: number;
  retailProfitRate?: number;
  manufacturer?: string;
  origin?: string;
  note?: string;
  drugSideEffect?: string;
  drugGroup?: number;
  flag?: boolean;
}
