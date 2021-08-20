import {PrescriptionDto} from './prescriptionDto';
import {Indicative} from './indicative';

export interface PrescriptionIndicative {
  prescriptionIndicativeId?: number;
  prescription?: PrescriptionDto;
  indicative?: Indicative;
}
