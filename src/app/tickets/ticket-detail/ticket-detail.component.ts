import { TicketService } from './../ticket.service';
import { Component, OnInit, Input } from '@angular/core';
import { Ticket } from '../ticket.model';

@Component({
  selector: 'app-ticket-detail',
  templateUrl: './ticket-detail.component.html',
  styleUrls: ['./ticket-detail.component.scss'],
})
export class TicketDetailComponent implements OnInit {
  @Input() ticket: Ticket;
  constructor(private ticketService: TicketService) {}

  ngOnInit(): void {}

  onAddToKTools() {
    this.ticketService.addIngredientsToKTools(this.ticket.ingredients);
  }
}
