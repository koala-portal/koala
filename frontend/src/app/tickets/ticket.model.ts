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
  created: string;
  updated: string;
  organization: string;
}

export interface StatusMap {
  status: string;
  description: string;
  color: string;
  checked: boolean;
}

export interface MyTicket {
  status: string;
  checked: boolean;
}

export interface RequestType {
  requestType: string;
  description: string;
  matIcon: string;
  role: string;
}
