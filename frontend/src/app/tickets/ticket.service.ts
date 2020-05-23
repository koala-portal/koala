import { Injectable } from '@angular/core';
import { Observable, of, Subject } from 'rxjs';

import { Ticket } from './ticket.model';
import { StatusMap } from './ticket.model';
import { MyTicket } from './ticket.model';
import { RequestType } from './ticket.model'
import { KToolsService } from '../k-tools/k-tools.service';
import { KTool } from '../shared/k-tool.model';
// import { KTool } from '../shared/k-tool.model';

@Injectable({ providedIn: 'root' })
export class TicketService {
  ticket$ = new Subject<Ticket[]>();
  selectedStatus$ = new Subject<StatusMap[]>();
  selectedMyTicket$ = new Subject<MyTicket[]>();
  selctedTools$ = new Subject<KTool[]>();

  private tickets: Ticket[] = [
    {
      id: 'CBS-0001',
      description: 'test one',
      title: 'one example',
      ticketNumber: 'C-1',
      serviceDeskTypes: 'Report a bug',
      kTool: 'Bing',
      status: 'Draft',
      assigned: 'Captain America (creator)',
      created: '01/01/2010',
      updated: '01/05/2012',
      organization: 'ABC/XYZ/123',
    },
    {
      id: 'CBS-0002',
      description: 'test two',
      title: 'test one',
      ticketNumber: 'C-1',
      serviceDeskTypes: 'Report a bug',
      kTool: 'Google',
      status: 'Draft',
      assigned: 'Charlie Brown (creator)',
      created: '01/01/2010',
      updated: '01/05/2012',
      organization: 'ABC/XYZ/123',
    },
    {
      id: 'CBS-0003',
      description: 'third ticket entry',
      title: 'test one',
      ticketNumber: 'C-1',
      serviceDeskTypes: 'Report a bug',
      kTool: 'Google',
      status: 'Resolved',
      assigned: '',
      created: '01/01/2010',
      updated: '01/05/2012',
      organization: 'ABC/XYZ/123',
    },
    {
      id: 'CBS-0005',
      description: '',
      title: 'polyjuice potion',
      ticketNumber: 'C-1',
      serviceDeskTypes: 'Report a bug',
      kTool: 'WinRAR',
      status: 'Open',
      assigned: 'unassigned',
      created: '01/01/2010',
      updated: '01/05/2012',
      organization: 'ABC/XYZ/123',
    },
    {
      id: 'CBS-0004',
      description: 'one ring to rull them all',
      title: 'Another test to show ',
      ticketNumber: 'C-1',
      serviceDeskTypes: 'Report a bug',
      kTool: 'Twiiter',
      status: 'Assigned',
      assigned: 'Kingpin',
      created: '01/01/2010',
      updated: '01/05/2012',
      organization: 'ABC/XYZ/123',
    },
    {
      id: 'CBS-0006',
      description: 'test one',
      title: 'Obi Wan Kenobi cannot access site',
      ticketNumber: 'C-1',
      serviceDeskTypes: 'Report a bug',
      kTool: 'Bing',
      status: 'Canceled',
      assigned: '',
      created: '01/01/2010',
      updated: '01/05/2012',
      organization: 'ABC/XYZ/123',
    },
  ];

  private ticketStatus: StatusMap[] = [
    { status: 'Draft', description: 'User creates a form but does not submit it to our team.', color: 'koala-amber-bg-2', checked: true },
    { status: 'Open', description: 'some more text', color: 'koala-green-bg-2', checked: true },
    { status: 'Assigned', description: 'some more text', color: 'koala-livid-bg-3', checked: true },
    { status: 'Queued', description: 'some more text', color: 'koala-green-bg-2', checked: true },
    { status: 'Resolved', description: 'some more text', color: 'koala-charcoal-bg-1', checked: true },
    { status: 'Canceled', description: 'some more text', color: 'koala-carminePink-bg-2', checked: true },
  ];


  private myTicketStatus: MyTicket[] = [
    { status: 'Created by me', checked: true },
    { status: 'Assigned to me', checked: true }    
  ];

  private requestTypes: RequestType[] = [
    { requestType: 'Mission System Registration', description: 'Submit a registration form for your system.', matIcon: 'how_to_vote', role: "ADMIN"},
    { requestType: 'Report a bug', description: 'Submit a bug or issue with one of our tools', matIcon: 'bug_report', role: "VIEWER"},
    { requestType: 'Raise a Question', description: 'Ask a question regarding a process within our organization. ', matIcon: 'help', role: "VIEWER"},
    { requestType: 'Suggest an Improvement', description: 'Suggest an improved with one of our applications or SDKs.', matIcon: 'feedback', role: "VIEWER"},
  ];

  constructor(private ktService: KToolsService) {}

  getTicket(ticketNo: string): Ticket {
    return this.tickets.find((x) => x.ticketNumber === ticketNo);
  }

  getTickets(): Ticket[] {
    return this.tickets.slice();
  }

  getStatus(status: string): StatusMap {
    return this.ticketStatus.find((x) => x.status === status);
  }

  getStatuses(): StatusMap[] {
    return this.ticketStatus.slice();
  }

  getMyViews(): MyTicket[] {
    return this.myTicketStatus.slice();
  }

  getRequestTypes(): RequestType[]{
    return this.requestTypes.slice();
  }

  getRequestTypeVals(requestType: string): RequestType {
    return this.requestTypes.find((x) => x.requestType === requestType);
  }

  //TODO fix this.. jmd
  filterTickets(selectedTools, selectedStatuses, filterText): Ticket[] {
    const filteredTickets = this.tickets.filter((ticket) => {
      return (
        !filterText ||
        ticket.title.toLowerCase().includes(filterText.toLowerCase())
      );
    });
    return filteredTickets;
  }

  put(ticket: Ticket): Observable<Ticket> {
    this.tickets.splice(
      this.tickets.findIndex((tic) => tic.id === ticket.id),
      1,
      ticket
    );
    this.ticket$.next(this.getTickets());
    return of(ticket);
  }

  post(ticket: Ticket): Observable<Ticket> {
    this.tickets.push(ticket);
    this.ticket$.next(this.getTickets());
    return of(ticket);
  }
}
