export interface Note {
  id: number;
  entityId: number;
  category: string;
  text: string;
  createdBy: string;
  created: Date;
  publicViewable: Boolean;
  editable: Boolean;
}
