import { KToolsService } from '../k-tools/k-tools.service';
import { Injectable } from '@angular/core';
import { Ticket } from './ticket.model';
// import { KTool } from '../shared/k-tool.model';
import { Observable, of, Subject } from 'rxjs';

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
    console.log(this.tickets);
    return this.tickets.slice();
  }

  getTicket(ticketNo): Ticket {
    const ticket = this.tickets.filter((x) => x.ticketNumber === ticketNo);
    return ticket[0];
  }

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
