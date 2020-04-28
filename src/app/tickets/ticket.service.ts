import { Injectable } from '@angular/core';
import { Observable, of, Subject } from 'rxjs';

import { Ticket } from './ticket.model';
import { StatusMap } from './ticket.model';
import { KToolsService } from '../k-tools/k-tools.service';
// import { KTool } from '../shared/k-tool.model';

@Injectable({ providedIn: 'root' })
export class TicketService {
  ticket$ = new Subject<Ticket[]>();

  private tickets: Ticket[] = [
    {
      id: 'CBS-0001',
      description: 'test one',
      title: 'test one',
      ticketNumber: 'C-1',
      serviceDeskTypes: 'Report a bug',
      kTool: 'Nationals',
      status: 'Draft',
      assigned: 'Captian America (creator)',
      priority: 'High',
      created: '01/01/2010',
      updated: '01/05/2012',
      organization: 'ABC/XYZ/123',
    },
    {
      id: 'CBS-0002',
      description: 'test one',
      title: 'test one',
      ticketNumber: 'C-1',
      serviceDeskTypes: 'Report a bug',
      kTool: 'Astros',
      status: 'Draft',
      assigned: 'Charlie Brown (creator)',
      priority: 'High',
      created: '01/01/2010',
      updated: '01/05/2012',
      organization: 'ABC/XYZ/123',
    },
    {
      id: 'CBS-0003',
      description: 'test one',
      title: 'test one',
      ticketNumber: 'C-1',
      serviceDeskTypes: 'Report a bug',
      kTool: 'Astros',
      status: 'Resolved',
      assigned: '',
      priority: 'High',
      created: '01/01/2010',
      updated: '01/05/2012',
      organization: 'ABC/XYZ/123',
    },
    {
      id: 'CBS-0005',
      description: 'test one',
      title: 'test one',
      ticketNumber: 'C-1',
      serviceDeskTypes: 'Report a bug',
      kTool: 'Astros',
      status: 'Open',
      assigned: 'unassigned',
      priority: 'High',
      created: '01/01/2010',
      updated: '01/05/2012',
      organization: 'ABC/XYZ/123',
    },
    {
      id: 'CBS-0004',
      description: 'test one',
      title: 'test ondasdfe',
      ticketNumber: 'C-1',
      serviceDeskTypes: 'Report a bug',
      kTool: 'Dodgers',
      status: 'Assigned',
      assigned: 'Kingpin',
      priority: 'High',
      created: '01/01/2010',
      updated: '01/05/2012',
      organization: 'ABC/XYZ/123',
    },
    {
      id: 'CBS-0006',
      description: 'test one',
      title: 'test ondasdfe',
      ticketNumber: 'C-1',
      serviceDeskTypes: 'Report a bug',
      kTool: 'Nationals',
      status: 'Canceled',
      assigned: '',
      priority: 'High',
      created: '01/01/2010',
      updated: '01/05/2012',
      organization: 'ABC/XYZ/123',
    },
  ];

  private statusMap: StatusMap[] = [
    { status: 'Draft', color: 'koala-amber-bg-2' },
    { status: 'Open', color: 'koala-green-bg-2' },
    { status: 'Assigned', color: 'koala-livid-bg-3' },
    { status: 'Resolved', color: 'koala-charcoal-bg-1' },
    { status: 'Canceled', color: 'koala-carminePink-bg-2' },
  ];

  constructor(private ktService: KToolsService) {}

  getTickets(): Ticket[] {
    return this.tickets.slice();
  }

  getTicket(ticketNo: string): Ticket {
    return this.tickets.find((x) => x.ticketNumber === ticketNo);
  }

  getStatuses(): StatusMap[] {
    return this.statusMap.slice();
  }

  getStatus(status: string): StatusMap {
    return this.statusMap.find((x) => x.status === status);
  }

  //TODO fix this.. jmd
  filterTickets(filteredValue): void {
    this.tickets.filter = filteredValue.trim().toLowerCase();
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
