import { Component, OnInit } from '@angular/core';
import { Ticket } from './ticket.model';
import { TicketService } from './ticket.service';
@Component({
  selector: 'app-tickets',
  templateUrl: './tickets.component.html',
  styleUrls: ['./tickets.component.scss'],
  providers: [TicketService],
})
export class TicketsComponent implements OnInit {
  selectedTicket: Ticket;

  constructor(private ticketService: TicketService) {}

  ngOnInit() {
    this.ticketService.ticketSelected.subscribe((ticket: Ticket) => {
      this.selectedTicket = ticket;
    });
  }
}
