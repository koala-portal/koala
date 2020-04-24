import { Component } from '@angular/core';
import { Ticket } from '../tickets/ticket.model';
import { TicketService } from '../tickets/ticket.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent {
  // TODO: set up hide/show additional views for tickets

  tickets: Ticket[];
  constructor(private ticketService: TicketService) {}

  ngOnInit(): void {
    this.tickets = this.ticketService.getTickets();
  }
}
