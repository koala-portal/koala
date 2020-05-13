import { Injectable } from '@angular/core';
import { Observable, of, Subject } from 'rxjs';

import { Ticket } from './ticket.model';
import { StatusMap } from './ticket.model';
import { KToolsService } from '../k-tools/k-tools.service';
import { KTool } from '../shared/k-tool.model';
// import { KTool } from '../shared/k-tool.model';

@Injectable({ providedIn: 'root' })
export class TicketService {
  ticket$ = new Subject<Ticket[]>();
  selectedStatus$ = new Subject<StatusMap[]>();
  selctedTools$ = new Subject<KTool[]>();

  private tickets: Ticket[] = [
    {
      id: 'CBS-0001',
      description: 'test one',
      title: 'one example',
      ticketNumber: 'C-1',
      serviceDeskTypes: 'Report a bug',
      kTool: 'Nationals',
      status: 'Draft',
      assigned: 'Captain America (creator)',
      priority: 'High',
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
      description: 'third ticket entry',
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
      description: '',
      title: 'polyjuice potion',
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
      description: 'one ring to rull them all',
      title: 'Another test to show ',
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
      title: 'Obi Wan Kenobi cannot access site',
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

  private ticketStatus: StatusMap[] = [
    { status: 'Draft', color: 'koala-amber-bg-2', checked: true },
    { status: 'Open', color: 'koala-green-bg-2', checked: true },
    { status: 'Assigned', color: 'koala-livid-bg-3', checked: true },
    { status: 'Resolved', color: 'koala-charcoal-bg-1', checked: true },
    { status: 'Canceled', color: 'koala-carminePink-bg-2', checked: true },
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

  //TODO fix this.. jmd
  filterTickets(selectedTools, selectedStatuses, filterText): Ticket[] {
    // const jmd = [1, 2, 3, 4].filter(function (e) {
    //   return this.indexOf(e) < 0;
    // }, selectedTools);

    console.log('tools', selectedTools);
    console.log('status', selectedStatuses);
    console.log(filterText);

    const filteredTickets = this.tickets.filter((ticket) => {
      return (
        !filterText ||
        ticket.title.toLowerCase().includes(filterText.toLowerCase())
      );
    });
    //console.log(filteredTickets);
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
