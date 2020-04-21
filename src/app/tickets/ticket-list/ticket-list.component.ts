import { Component, OnInit, ViewChild } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Ticket } from '../ticket.model';
import { TicketService } from '../ticket.service';
import { MatDialogConfig, MatDialog } from '@angular/material/dialog';
import { TicketDetailComponent } from '../ticket-detail/ticket-detail.component';
import {MatSort} from '@angular/material/sort'

@Component({
  selector: 'app-ticket-list',
  templateUrl: './ticket-list.component.html',
  styleUrls: ['./ticket-list.component.scss'],
})
export class TicketListComponent implements OnInit {
  tickets: Ticket[];
  displayedColumns: string[] = ['ticketNo', 'name', 'description', 'icons'];
  @ViewChild(MatSort, {static: true}) sort: MatSort;

  constructor(
    private ticketService: TicketService,
    private router: Router,
    private route: ActivatedRoute,
    private dialog: MatDialog
  ) {}

  ngOnInit() {
    this.tickets = this.ticketService.getTickets();
  }

  onNewTicket() {
    this.router.navigate(['new'], { relativeTo: this.route });
  }

  viewDetails(element: any) {
    this.router.navigate([element.ticketNumber], { relativeTo: this.route });
  }

  openDialog() {
    const dialogConfig = new MatDialogConfig();
    this.dialog.open(TicketDetailComponent, dialogConfig);

    // dialogRef.afterClosed().subscribe((result) => {
    //   this.ticket = result;
    // });
  }

  applyFilter(event: Event ) {
    const filterValue = (event.target as HTMLInputElement).value;
    //this.tickers.filter = filterValue.trim().toLowerCase();
  }

}
