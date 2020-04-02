import { Component, OnInit } from '@angular/core';
import { Ticket } from './ticket.model';

@Component({
  selector: 'app-ticket-list',
  templateUrl: './ticket-list.component.html',
  styleUrls: ['./ticket-list.component.scss']
})
export class TicketListComponent implements OnInit {
  tickets: Ticket[] = [
    new Ticket('Test', 'Another test', "https://www.aarki.com/hs-fs/hubfs/blog%20header_deep%20thinking_2%20copy%20(2).jpg?width=2044&name=blog%20header_deep%20thinking_2%20copy%20(2).jpg"),
    new Ticket('Test 2', 'Another test', "https://www.aarki.com/hs-fs/hubfs/blog%20header_deep%20thinking_2%20copy%20(2).jpg?width=2044&name=blog%20header_deep%20thinking_2%20copy%20(2).jpgE")
  ];

  constructor() { }

  ngOnInit(): void {
  }

}
