import {Drug} from './drug';
import {PrescriptionIndicative} from './prescription-indicative';

export interface Indicative {
  indicativeId?: number;
  totalPill?: number;
  drinkDay?: number;
  drinkTime?: number;
  drug?: Drug;
}
