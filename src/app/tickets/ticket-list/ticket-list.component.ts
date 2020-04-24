import { Component, OnInit, ViewChild } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { MatSort } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { MatDialogRef, MatDialog } from '@angular/material/dialog';
import { Subscription } from 'rxjs';

import { Ticket } from '../ticket.model';
import { TicketService } from '../ticket.service';
import { TicketDetailComponent } from '../ticket-detail/ticket-detail.component';
import { TicketFormComponent } from '../ticket-form/ticket-form.component';

@Component({
  selector: 'app-ticket-list',
  templateUrl: './ticket-list.component.html',
  styleUrls: ['./ticket-list.component.scss'],
})
export class TicketListComponent implements OnInit {
  tickets: Ticket[];
  ticketsTable = new MatTableDataSource(this.tickets);
  displayedColumns: string[] = ['ticketNo', 'name', 'description', 'icons'];

  private ticketChangeSub: Subscription;

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

    this.ticketChangeSub = this.ticketService.ticket$.subscribe(
      (tickets: Ticket[]) => {
        this.tickets = tickets;
      }
    );
  }

  openDetails(data?: Ticket): MatDialogRef<TicketDetailComponent, Ticket> {
    return this.dialog.open(TicketDetailComponent, {
      disableClose: true,
      data: data,
      panelClass: 'form-dialog',
      position: { top: '30' },
    });
  }

  openForm(data?: Ticket): MatDialogRef<TicketFormComponent, Ticket> {
    return this.dialog.open(TicketFormComponent, {
      disableClose: true,
      data: data,
      panelClass: 'form-dialog',
      position: { top: '30' },
    });
  }

  //Fix mat filter for applying this.
  applyFilter(event: Event): void {
    const filterValue = (event.target as HTMLInputElement).value;
    this.ticketService.filterTickets(filterValue);
  }

  ngOnDestroy(): void {
    this.ticketChangeSub.unsubscribe();
  }

  // TODO: Reconfig to use shared modal component
  // openModal(data?: Ticket): void {
  //   const dialogConfig = new MatDialogConfig();
  //   dialogConfig.disableClose = true;
  //   dialogConfig.id = 'modal-component';
  //   dialogConfig.height = '350px';
  //   dialogConfig.width = '600px';
  //   dialogConfig.data = data;
  //   dialogConfig.panelClass = 'form-dialog';
  //   const modalDialog = this.dialog.open(ModalComponent, dialogConfig);
  // }
}
