import { Component } from '@angular/core';
import { Ticket } from '../tickets/ticket.model';
import { TicketService } from '../tickets/ticket.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent {
  // TO DO: set up hide/show for "Manage Service Desk"
  // to only be certain user group
  tickets: Ticket[];
  constructor(private ticketService: TicketService) {}

  ngOnInit() {
    this.tickets = this.ticketService.getTickets();
  }
}
