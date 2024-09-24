import { DexieDbService } from '../Services/dexie-db.service'


export class ReferenceTableData {
  tableName: string;
  rowCount: number;
  writeDate: number; // Unix milliseconds.

  constructor(tableName = null, rowCount = 0) {
    this.tableName = tableName;
    this.rowCount = rowCount;
    this.writeDate = 0;
  }

  // Insert or update as appropriate.
  public save(db: DexieDbService): Promise<number> {
    // Returns Promise;
    const me: ReferenceTableData = this;
    me.writeDate = Date.now();
    // console.log("ReferenceTableData save Begin.", this);
    return db.referenceTableLog
      .get(me.tableName)
      .then(function(existingRow) {
        if (existingRow === undefined) {
          // Not found. Make new.
          return db.referenceTableLog.put(me);
        } else {
          existingRow.writeDate = me.writeDate;
          return db.referenceTableLog.put(existingRow);
        }
      })
      .catch(function(error) {
        console.log('ReferenceTableData save ERROR.', error);
        return null;
      });
  }
}
