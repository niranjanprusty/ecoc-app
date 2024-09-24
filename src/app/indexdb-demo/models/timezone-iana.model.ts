/* tslint:disable */
import { TimezoneModel } from './timezone-model';
export interface TimezoneIanaModel {
  ZoneId?: number;
  Name?: string;
  CanonicalZoneId?: number;
  TalsTzId?: number;
  TalsTz?: TimezoneModel;
}
