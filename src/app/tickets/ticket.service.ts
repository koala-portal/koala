import { KToolsService } from '../k-tools/k-tools.service';
import { Injectable } from '@angular/core';
import { Ticket } from './ticket.model';
import { Ingredient } from '../shared/ingredient.model';

@Injectable()
export class TicketService {
  private tickets: Ticket[] = [
    new Ticket(
      'Trouble Accessing Site',
      'Lorem ipsum dolor sit amet consectetur, adipisicing elit. Perferendis esse nemo eligendi tempora, molestiae voluptatem quia et cum obcaecati dolor?',
      'https://www.aarki.com/hs-fs/hubfs/blog%20header_deep%20thinking_2%20copy%20(2).jpg?width=2044&name=blog%20header_deep%20thinking_2%20copy%20(2).jpg',
      [new Ingredient('Meat', 1), new Ingredient('Chips', 20)]
    ),
    new Ticket(
      'Training Dates and Sign up',
      'Lorem ipsum dolor sit amet consectetur adipisicing elit. Totam quisquam harum sit!',
      'https://www.aarki.com/hs-fs/hubfs/blog%20header_deep%20thinking_2%20copy%20(2).jpg?width=2044&name=blog%20header_deep%20thinking_2%20copy%20(2).jpgE',
      [new Ingredient('Buns', 2), new Ingredient('Meat', 1)]
    ),
  ];

  constructor(private ktService: KToolsService) {}

  getTickets() {
    return this.tickets.slice();
  }

  getTicket(index: number) {
    return this.tickets[index];
  }

  addIngredientsToKTools(ingredients: Ingredient[]) {
    this.ktService.addIngredients(ingredients);
  }
}
