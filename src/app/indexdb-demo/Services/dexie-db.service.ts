import { Injectable } from '@angular/core';
import Dexie from 'dexie';
import * as ReferenceModels from '../models/index'

@Injectable({
  providedIn: 'root'
})

export class DexieDbService extends Dexie {

  timezone!: Dexie.Table<ReferenceModels.TimezoneModel, number>;
  timezoneIana!: Dexie.Table<ReferenceModels.TimezoneIanaModel, number>;
  referenceTableLog!: Dexie.Table<ReferenceModels.ReferenceTableData, string>;

  constructor(){
    super('TalsWebDatabase');
    super.version(1).stores({
    timezone: 'TzId, TzSdesc, TzGmtOffset',
    timezoneIana: 'ZoneId, Name, TalsTzId',
  });
  }

}


export const ReadOnlyTables = {
  timezone: 'timezone',
  timezoneIana: 'timezoneIana',
};

export const ReadOnlyApiEndPoints = {
  chainOfCustodyShallow: 'ChainOfCustodyShallow',
  talsWebSampleMatrix: 'TalsWebSampleMatrix',
  talsWebSampleType: 'TalsWebSampleType',
  timezone: 'Timezone',
  timezoneIana: 'TimezoneIana',
};

export const ReadWriteTables = {
  chainOfCustodyShallow: 'chainOfCustodyShallow',
  chainOfCustody: 'chainOfCustody',
  coolerReceipt: 'coolerReceipt',
  talsWebUser: 'talsWebUser',
};
