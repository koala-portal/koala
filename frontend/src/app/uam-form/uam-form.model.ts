import { Note } from '../shared/note.model';
import { HistoryEntry } from '../shared/history-entry.model';

export interface UamForm {
    id: number;
    ownerId: String;
    created: Date;
    createdBy: String;
    updated: Date;
    updatedBy: String;
    status: String;
    organization: String;
    authAndAccredNumber: String;
    ownerOfForm: Boolean;
    editable: Boolean;
    createdByLabel: String;
    updatedByLabel: String;
    ownerLabel: String;
    notes: Note[];
    history: HistoryEntry[];
    permittedActions: String[];
}