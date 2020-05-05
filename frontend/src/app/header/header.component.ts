import { Component } from '@angular/core';

import { Ticket } from '../tickets/ticket.model';
import { TicketService } from '../tickets/ticket.service';
import { User } from '../k-tools/user.model';

import { ToastrService } from 'ngx-toastr';
import { KToolsService } from '../k-tools/k-tools.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent {
  // TODO: set up hide/show additional views for tickets

  tickets: Ticket[];
  constructor(
    private ticketService: TicketService,
    private ktService: KToolsService,
    private toastr: ToastrService
  ) {}

  ngOnInit(): void {
    this.ktService.whoamiEmitter.subscribe((user: User) => {
      this.toastr.show(
        'Currently you hold the role of <strong>' +
          user.role +
          '</strong> within the system.',
        'Welcome to KOALA ' + user.userName
      );
    });

    this.tickets = this.ticketService.getTickets();
    this.ktService.whoAmI();
  }
}
