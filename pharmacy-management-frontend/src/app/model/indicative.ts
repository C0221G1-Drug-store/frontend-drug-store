import {Drug} from './drug';
import {PrescriptionIndicative} from './prescription-indicative';
import {PrescriptionDto} from './prescriptionDto';

export interface Indicative {
  indicativeId?: number;
  totalPill?: number;
  drinkDay?: number;
  drinkTime?: number;
  drug?: string;
  prescription?: PrescriptionDto;
}
