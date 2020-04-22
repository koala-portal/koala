import { KToolsService } from '../k-tools/k-tools.service';
import { Injectable } from '@angular/core';
import { Ticket } from './ticket.model';
import { KTool } from '../shared/k-tool.model';
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
    },
    {
      id: 'CBS-0002',
      description: 'test one',
      title: 'test one',
      ticketNumber: 'C-1',
    },
    {
      id: 'CBS-0003',
      description: 'test one',
      title: 'test one',
      ticketNumber: 'C-1',
    },
    {
      id: 'CBS-0005',
      description: 'test one',
      title: 'test one',
      ticketNumber: 'C-1',
    },
    {
      id: 'CBS-0004',
      description: 'test one',
      title: 'test ondasdfe',
      ticketNumber: 'C-1',
    },
    {
      id: 'CBS-0006',
      description: 'test one',
      title: 'test ondasdfe',
      ticketNumber: 'C-1',
    },
  ];

  constructor(private ktService: KToolsService) {}

  getTickets(): Ticket[] {
    return this.tickets.slice();
  }

  getTicket(ticketNo): Ticket {
    const ticket = this.tickets.filter((x) => x.ticketNumber === ticketNo);
    return ticket[0];
  }

  getDimensionsByFind(ticketNo: any) {
    return this.tickets.find((x) => x.ticketNumber === ticketNo);
  }

  addToKTools(ingredients: KTool[]): void {
    this.ktService.addkTools(ingredients);
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
    return of(ticket);
  }

  post(ticket: Ticket): Observable<Ticket> {
    this.tickets.push(ticket);
    this.ticket$.next(this.getTickets());
    return of(ticket);
  }

  delete(ticketDeleted: Ticket): Observable<void> {
    this.tickets = this.tickets.filter(
      (ticket) => ticketDeleted.id !== ticket.id
    );
    this.ticket$.next(this.getTickets());
    return of();
  }
}
