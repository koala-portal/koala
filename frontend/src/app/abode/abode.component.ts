import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MatDialogRef, MatDialog } from '@angular/material/dialog';

import { ConfigServices } from '../shared/config.services';
import { WhoAmIServices } from '../shared/whoami.services';
import { MessageService } from '../shared/message.service';
import { Ticket } from '../tickets/ticket.model';
import { RequestType } from '../tickets/ticket.model';
import { TicketService } from '../tickets/ticket.service';
import { TicketFormComponent } from '../tickets/ticket-form/ticket-form.component';

@Component({
  selector: 'app-abode',
  templateUrl: './abode.component.html',
  styleUrls: ['./abode.component.scss'],
})
export class AbodeComponent implements OnInit {
  requestTypes: RequestType[];
  koalaOrgName: string;
  userIsAdmin = false;

  constructor(
    private ticketService: TicketService,
    private dialog: MatDialog,
    private configServices: ConfigServices,
    private whoAmIServices: WhoAmIServices,
    private messageService: MessageService,
  ) {
    this.koalaOrgName = this.configServices.koalaOrgName;
  }

  ngOnInit(): void {
        
    this.whoAmIServices.whoAmI().subscribe(
      (user)=> {
        this.userIsAdmin = user.role == "ADMIN";
      },
      (error: any)=> {
       this.messageService.showErrorWithDetailsTst(  error.error.resolution,
                                                          error.error.error);
        this.userIsAdmin = false;
      }
    );
    this.requestTypes = this.ticketService.getRequestTypes();
  }

  // newTicketForm(requestType): void {
  //   this.router.navigate(['./tickets']);
  // }

  newTicketForm(data?: Ticket): MatDialogRef<TicketFormComponent, Ticket> {
    console.log(data)
    return this.dialog.open(TicketFormComponent, {
      disableClose: true,
      data: data,
      panelClass: 'form-dialog',
      position: { top: '30' },
    });
  }
}
