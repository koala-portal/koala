export interface Note {
  id: number;
  entityId: number;
  category: String;
  text: String;
  createdBy: String;
  created: Date;
  publicViewable: Boolean;
  editable: Boolean;
}
