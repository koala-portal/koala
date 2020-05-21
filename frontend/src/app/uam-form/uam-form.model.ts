import { Note } from '../shared/note.model';
import { HistoryEntry } from '../shared/history-entry.model';

export interface UamForm {
  id: number;
  ownerId: string;
  created: Date;
  createdBy: string;
  updated: Date;
  updatedBy: string;
  status: string;
  organization: string;
  authAndAccredNumber: string;
  ownerOfForm: Boolean;
  editable: Boolean;
  createdByLabel: string;
  updatedByLabel: string;
  ownerLabel: string;
  notes: Note[];
  history: HistoryEntry[];
  permittedActions: string[];
}
