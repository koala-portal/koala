import { KToolsService } from '../k-tools/k-tools.service';
import { Injectable } from '@angular/core';
import { Ticket } from './ticket.model';
import { KTool } from '../shared/k-tool.model';

@Injectable()
export class TicketService {
  private tickets: Ticket[] = [
    new Ticket(
      'Trouble Accessing Site',
      'Lorem ipsum dolor sit amet consectetur, adipisicing elit. Perferendis esse nemo eligendi tempora, molestiae voluptatem quia et cum obcaecati dolor?',
      'https://www.aarki.com/hs-fs/hubfs/blog%20header_deep%20thinking_2%20copy%20(2).jpg?width=2044&name=blog%20header_deep%20thinking_2%20copy%20(2).jpg',
      [new KTool('ABC', 1), new KTool('EFG', 20)],
      'CBS-0001'
    ),
    new Ticket(
      'Training Dates and Sign up',
      'Lorem ipsum dolor sit amet consectetur adipisicing elit. Totam quisquam harum sit!',
      'https://www.aarki.com/hs-fs/hubfs/blog%20header_deep%20thinking_2%20copy%20(2).jpg?width=2044&name=blog%20header_deep%20thinking_2%20copy%20(2).jpgE',
      [new KTool('WWE', 2), new KTool('NBC', 1)],
      'NBC-0001'
    ),
  ];

  constructor(private ktService: KToolsService) {}

  getTickets() {
    return this.tickets.slice();
  }

  getTicket(ticketNo) {
    const ticket = this.tickets.filter((x) => x.ticketNumber === ticketNo);
    return ticket[0];
  }

  getDimensionsByFind(ticketNo: any) {
    return this.tickets.find((x) => x.ticketNumber === ticketNo);
  }

  addToKTools(ingredients: KTool[]) {
    this.ktService.addkTools(ingredients);
  }
}
