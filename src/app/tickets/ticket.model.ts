// import { KTool } from '../shared/k-tool.model';

export interface Ticket {
  id: string;
  title: string;
  description: string;
  ticketNumber: string;
  serviceDeskTypes: string;
  kTool: string;
  status: string;
  assigned: string;
  priority: string;
  created: string;
  updated: string;
  organization: string;
}

export interface StatusMap {
  status: string;
  color: string;
  checked: boolean;
}
