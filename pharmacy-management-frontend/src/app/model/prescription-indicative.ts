import {Prescription} from './prescription';
import {Indicative} from './indicative';

export interface PrescriptionIndicative {
  prescriptionIndicative?: number;
  prescription?: Prescription;
  indicatives?: Indicative[];
}
