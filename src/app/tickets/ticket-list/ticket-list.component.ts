import { Component, OnInit, ViewChild } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { MatSort } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import {
  MatDialogConfig,
  MatDialogRef,
  MatDialog,
} from '@angular/material/dialog';

import { Ticket } from '../ticket.model';
import { TicketService } from '../ticket.service';
import { TicketDetailComponent } from '../ticket-detail/ticket-detail.component';
import { TicketFormComponent } from '../ticket-form/ticket-form.component';
//import { ModalComponent } from '../../shared/modal/modal.component';

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

  openDetails(data?: Ticket): MatDialogRef<TicketDetailComponent, Ticket> {
    return this.dialog.open(TicketDetailComponent, {
      disableClose: true,
      width: '800px',
      minHeight: '500px',
      data: data,
      panelClass: 'form-dialog',
    });
  }

  openForm(data?: Ticket): MatDialogRef<TicketFormComponent, Ticket> {
    return this.dialog.open(TicketFormComponent, {
      disableClose: true,
      width: '800px',
      minHeight: '500px',
      data: data,
      panelClass: 'form-dialog',
    });
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

  applyFilter(event: Event): void {
    const filterValue = (event.target as HTMLInputElement).value;
    this.ticketService.filterTickets(filterValue);
  }
}
