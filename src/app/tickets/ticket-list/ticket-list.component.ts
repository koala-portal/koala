import { TicketEditComponent } from './../ticket-edit/ticket-edit.component';
import { Component, OnInit, ViewChild } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Ticket } from '../ticket.model';
import { TicketService } from '../ticket.service';
import {
  MatDialogConfig,
  MatDialogRef,
  MatDialog,
} from '@angular/material/dialog';
import { TicketDetailComponent } from '../ticket-detail/ticket-detail.component';
import { MatSort } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';

@Component({
  selector: 'app-ticket-list',
  templateUrl: './ticket-list.component.html',
  styleUrls: ['./ticket-list.component.scss'],
})
export class TicketListComponent implements OnInit {
  tickets: Ticket[];
  ticketsTable = new MatTableDataSource(this.tickets);
  displayedColumns: string[] = ['ticketNo', 'name', 'description', 'icons'];

  @ViewChild(MatSort, { static: true }) sort: MatSort;
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;

  constructor(
    private ticketService: TicketService,
    private router: Router,
    private route: ActivatedRoute,
    private dialog: MatDialog
  ) {}

  ngOnInit(): void {
    this.tickets = this.ticketService.getTickets();
    this.ticketsTable = new MatTableDataSource<Ticket>(this.tickets);
    // this.tickets.paginator = this.paginator;
  }

  onNewTicket(): void {
    this.router.navigate(['new'], { relativeTo: this.route });
  }

  viewDetails(element: Ticket): void {
    this.router.navigate([element.ticketNumber], { relativeTo: this.route });
  }

  openDetailDialog(): void {
    const dialogConfig = new MatDialogConfig();
    this.dialog.open(TicketDetailComponent, dialogConfig);

    // dialogRef.afterClosed().subscribe((result) => {
    //   this.ticket = result;
    // });
  }

  openDialog(data): MatDialogRef<TicketDetailComponent, Ticket> {
    return this.dialog.open(TicketDetailComponent, {
      disableClose: true,
      width: '500px',
      data: data,
    });
  }

  applyFilter(event: Event): void {
    const filterValue = (event.target as HTMLInputElement).value;
    this.ticketService.filterTickets(filterValue);
  }
}
