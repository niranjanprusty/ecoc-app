import { lastValueFrom } from 'rxjs';

import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { Table } from 'dexie';

import { environment } from '../../../environments/environment';
import { ReferenceTableData } from '../models';
import { DexieDbService, ReadOnlyApiEndPoints, ReadOnlyTables } from './dexie-db.service';

import {
  TimezoneIanaModel,
  TimezoneModel
} from '../models';

@Injectable({
  providedIn: 'root'
})
export class ReferenceDataService
{

  maxReferenceDataAgeHours: number = 2;

  constructor(
    private http: HttpClient,
    private dexieDbService: DexieDbService
  ) {}

  dataAgeHours(writeDate: number) {
    return Math.abs(Date.now() - writeDate) / 36e5; // 36e5 is scientific notation for 60*60*1000. Converts ms into hours.
  }
  async timezoneIana_get() {
    return this.referenceData_get<TimezoneIanaModel>(ReadOnlyTables.timezoneIana);
  }

  async timezoneIana_setFromApi() {
    return this.referenceData_setFromApi<TimezoneIanaModel>(ReadOnlyTables.timezoneIana);
  }

  async timezone_get() {
    return this.referenceData_get<TimezoneModel>(ReadOnlyTables.timezone);
  }

  async timezone_setFromApi() {
    return this.referenceData_setFromApi<TimezoneModel>(ReadOnlyTables.timezone);
  }

  private async referenceData_get<T>(tableName: string, sortColumn = "", hardRefresh = false): Promise<T[]> {
    const tableData = await this.dexieDbService.referenceTableLog.get(tableName);
    const table: Table<T> = this.dexieDbService[tableName];

    if (!tableData?.rowCount || this.dataAgeHours(tableData.writeDate) > this.maxReferenceDataAgeHours)
      await this.referenceData_setFromApi<T>(tableName, hardRefresh);

    if (sortColumn)
      return table.orderBy(sortColumn).toArray();
    else
      return table.toArray();
  }

  private async referenceData_setFromApi<T>(tableName: string, hardRefresh = false) {
    const END_POINT = `${environment.apiURL}${ReadOnlyApiEndPoints[tableName]}`;
    const array = await lastValueFrom(this.http.get<T[]>(END_POINT));

    await this.referenceData_setFromArray<T>(tableName, hardRefresh, array);

    return;
  }

  private async referenceData_setFromArray<T>(tableName: string, hardRefresh = false, array: T[]) {
    const rowCount = array.length;
    const table: Table = this.dexieDbService[tableName];

    if (hardRefresh)
      await table.clear();

    await table.bulkPut(array);

    const rtd = new ReferenceTableData(tableName, rowCount);

    await rtd.save(this.dexieDbService);

    return;
  }

}
