import { Component, OnInit, ViewChild } from '@angular/core';
import { MatSort } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';
import { MatDialogRef, MatDialog } from '@angular/material/dialog';
import { MatChipInputEvent } from '@angular/material/chips';
import { FormControl } from '@angular/forms';
import { Subscription } from 'rxjs';

import { StatusMap } from '../ticket.model';
import { Ticket } from '../ticket.model';
import { TicketService } from '../ticket.service';
import { TicketItemComponent } from '../ticket-item/ticket-item.component';
import { TicketFormComponent } from '../ticket-form/ticket-form.component';
import { KTool } from 'src/app/shared/k-tool.model';
import { KToolsService } from '../../k-tools/k-tools.service';

@Component({
  selector: 'app-ticket-list',
  templateUrl: './ticket-list.component.html',
  styleUrls: ['./ticket-list.component.scss'],
})
export class TicketListComponent implements OnInit {
  tickets: Ticket[];
  statusValues: StatusMap[];

  // ticketsTable = new MatTableDataSource(this.tickets);
  displayedColumns: string[] = ['stat'];
  sideNavEvents: string[] = [];
  opened: boolean;
  mode = new FormControl('side');
  visible = true;
  selectable = true;
  removable = true;
  kTools: KTool[];

  private ticketChangeSub: Subscription;

  @ViewChild(MatSort, { static: true }) sort: MatSort;
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;

  constructor(
    private ticketService: TicketService,
    private dialog: MatDialog,
    private kToolsService: KToolsService
  ) {}

  ngOnInit(): void {
    this.tickets = this.ticketService.getTickets();
    this.statusValues = this.ticketService.getStatuses();
    this.kTools = this.kToolsService
      .getKTools()
      .map((v) => ({ ...v, isActive: true }));

    this.ticketChangeSub = this.ticketService.ticket$.subscribe(
      (tickets: Ticket[]) => {
        this.tickets = tickets;
      }
    );

    console.log(this.kTools);
  }

  openDetails(data?: Ticket): MatDialogRef<TicketItemComponent, Ticket> {
    return this.dialog.open(TicketItemComponent, {
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

  statColor(stat: string): string {
    const status = this.ticketService.getStatus(stat);
    return status.color;
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

  // mat chips
  removeMat(kTool: { isActive: boolean }): boolean {
    kTool.isActive = false;
    console.log(kTool.isActive);
    return kTool.isActive;
  }
}
