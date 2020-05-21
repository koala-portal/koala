import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { AppService } from 'src/app/app.service';
import { TicketService } from 'src/app/tickets/ticket.service';

@Component({
  selector: 'app-link-list',
  templateUrl: './link-list.component.html',
  styleUrls: ['./link-list.component.scss'],
})
export class LinkListComponent implements OnInit, OnDestroy {
  ticketCount = 0;

  private ticketsSub: Subscription;

  constructor(
    public appService: AppService,
    private ticketService: TicketService
  ) {}

  ngOnInit(): void {
    this.ticketsSub = this.ticketService.ticket$.subscribe((tickets) => {
      this.ticketCount = tickets.length;
    });
  }

  ngOnDestroy() {
    this.ticketsSub.unsubscribe();
  }

  onClickLink() {
    this.appService.sidenavIsOpen = false;
  }
}
