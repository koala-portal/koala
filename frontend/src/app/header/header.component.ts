import { AppService } from './../app.service';
import { Component } from '@angular/core';

import { Ticket } from '../tickets/ticket.model';
import { TicketService } from '../tickets/ticket.service';
import { MessageService } from 'src/app/shared/message.service';

import { ToastrService } from 'ngx-toastr';
import { WhoAmIServices } from '../shared/whoami.services';


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
    private messageService: MessageService,
    private whoAmIServices: WhoAmIServices,
    private toastr: ToastrService,
    public appService: AppService
  ) {}

  ngOnInit(): void {
    //Get the user's role
    this.whoAmIServices.whoAmI().subscribe(
        (user)=> {
          this.toastr.show(
            'Currently you hold the role of <strong>' +
              user.role +
              '</strong> within the system.',
            'Welcome to KOALA ' + user.userName
          );
        },
        (error: any)=> {
          this.messageService.showErrorWithDetailsTst(  error.error.resolution,
                                                        error.error.error);
        }
    );

    this.tickets = this.ticketService.getTickets();
  }

  onClickMenu() {
    this.appService.sidenavIsOpen = !this.appService.sidenavIsOpen;
  }
}
