import { Component, OnInit } from '@angular/core';
import { Ticket } from './ticket.model';
@Component({
  selector: 'app-tickets',
  templateUrl: './tickets.component.html',
  styleUrls: ['./tickets.component.scss']
})
export class TicketsComponent implements OnInit {
  selectedTicket: Ticket;
  
  constructor() { }

  ngOnInit(): void {
  }

}
