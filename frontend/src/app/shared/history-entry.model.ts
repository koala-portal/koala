
export interface HistoryEntry {
  id: number;
  entityId: number;
  entityType: String;
  orgStatus: String;
  action: String;
  newStatus: String,
  doneBy: String;
  doneOn: Date;
}
