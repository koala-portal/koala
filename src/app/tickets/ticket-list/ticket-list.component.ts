import { Component, OnInit } from '@angular/core';
import { Ticket } from '../ticket.model';
import { TicketService } from '../ticket.service';

@Component({
  selector: 'app-ticket-list',
  templateUrl: './ticket-list.component.html',
  styleUrls: ['./ticket-list.component.scss'],
})
export class TicketListComponent implements OnInit {
  tickets: Ticket[];

  constructor(private ticketService: TicketService) {}

  ngOnInit() {
    this.tickets = this.ticketService.getTickets();
  }
}
