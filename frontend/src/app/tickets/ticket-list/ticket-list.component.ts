import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Ticket } from '../ticket.model';
import { TicketService } from '../ticket.service';

@Component({
  selector: 'app-ticket-list',
  templateUrl: './ticket-list.component.html',
  styleUrls: ['./ticket-list.component.scss'],
})
export class TicketListComponent implements OnInit {
  tickets: Ticket[];

  constructor(
    private ticketService: TicketService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit() {
    this.tickets = this.ticketService.getTickets();
  }

  onNewTicket() {
    this.router.navigate(['new'], { relativeTo: this.route });
  }
}
