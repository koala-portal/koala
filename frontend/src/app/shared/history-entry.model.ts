export interface HistoryEntry {
  id: number;
  entityId: number;
  entityType: string;
  orgStatus: string;
  action: string;
  newStatus: string;
  doneBy: string;
  doneOn: Date;
}
