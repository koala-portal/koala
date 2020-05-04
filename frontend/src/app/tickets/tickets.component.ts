import { Component, OnInit } from '@angular/core';
import { TicketService } from './ticket.service';
@Component({
  selector: 'app-tickets',
  templateUrl: './tickets.component.html',
  styleUrls: ['./tickets.component.scss'],
  providers: [TicketService],
})
export class TicketsComponent implements OnInit {
  constructor() {}

  ngOnInit() {}
}
