import { Injectable } from '@angular/core';
import { Observable, of, Subject } from 'rxjs';

import { Ticket } from './ticket.model';
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
    },
    {
      id: 'CBS-0002',
      description: 'test one',
      title: 'test one',
      ticketNumber: 'C-1',
      serviceDeskTypes: 'Report a bug',
      kTool: 'Astros',
    },
    {
      id: 'CBS-0003',
      description: 'test one',
      title: 'test one',
      ticketNumber: 'C-1',
      serviceDeskTypes: 'Report a bug',
      kTool: 'Astros',
    },
    {
      id: 'CBS-0005',
      description: 'test one',
      title: 'test one',
      ticketNumber: 'C-1',
      serviceDeskTypes: 'Report a bug',
      kTool: 'Astros',
    },
    {
      id: 'CBS-0004',
      description: 'test one',
      title: 'test ondasdfe',
      ticketNumber: 'C-1',
      serviceDeskTypes: 'Report a bug',
      kTool: 'Dodgers',
    },
    {
      id: 'CBS-0006',
      description: 'test one',
      title: 'test ondasdfe',
      ticketNumber: 'C-1',
      serviceDeskTypes: 'Report a bug',
      kTool: 'Nationals',
    },
  ];

  constructor(private ktService: KToolsService) {}

  getTickets(): Ticket[] {
    return this.tickets.slice();
  }

  getTicket(ticketNo: string): Ticket {
    return this.tickets.find((x) => x.ticketNumber === ticketNo);
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
