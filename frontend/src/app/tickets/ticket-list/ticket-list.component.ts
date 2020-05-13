import { Component, OnInit, ViewChild } from '@angular/core';
// import { MatSort } from '@angular/material/sort';
// import { MatPaginator } from '@angular/material/paginator';
import { MatDialogRef, MatDialog } from '@angular/material/dialog';
import { FormControl, NgModel } from '@angular/forms';
import { Subscription } from 'rxjs';

import { StatusMap } from '../ticket.model';
import { Ticket } from '../ticket.model';
import { TicketService } from '../ticket.service';
import { TicketItemComponent } from '../ticket-item/ticket-item.component';
import { TicketFormComponent } from '../ticket-form/ticket-form.component';
import { KToolActive } from 'src/app/shared/k-tool.model';
import { KToolsService } from '../../k-tools/k-tools.service';
import { MatListOption } from '@angular/material/list';

@Component({
  selector: 'app-ticket-list',
  templateUrl: './ticket-list.component.html',
  styleUrls: ['./ticket-list.component.scss'],
})
export class TicketListComponent implements OnInit {
  tickets: Ticket[];
  ticketStatus: StatusMap[];
  kTools: KToolActive[];
  kToolsActive: KToolActive[];

  // ticketsTable = new MatTableDataSource(this.tickets);
  displayedColumns: string[] = ['stat'];
  sideNavEvents: string[] = [];
  mode = new FormControl('side');
  opened: boolean;
  visible = true;
  selectable = true;
  removable = true;
  filterText = '';
  direction = 'asc';
  status = '';
  statusSelect = '';

  private ticketChangeSub: Subscription;

  constructor(
    private ticketService: TicketService,
    private dialog: MatDialog,
    private kToolsService: KToolsService
  ) {}

  ngOnInit(): void {
    this.tickets = this.ticketService.getTickets();
    this.ticketStatus = this.ticketService.getStatuses();
    this.kTools = this.kToolsService
      .getKTools()
      .map((v) => ({ ...v, isActive: true }));

    this.ticketChangeSub = this.ticketService.ticket$.subscribe(
      (tickets: Ticket[]) => {
        this.tickets = tickets;
      }
    );
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

  getFilteredTickets(): void {
    this.tickets = this.ticketService.getTickets();

    const ticketFiltering = this.ticketService.filterTickets(
      this.kToolsActive,
      this.ticketStatus,
      this.filterText
    );

    this.tickets = ticketFiltering;
  }

  // mat chips
  removeMatChip(kTool: { isActive: boolean }): boolean {
    kTool.isActive = false;
    this.findByActive();
    return kTool.isActive;
  }

  //Find by selected Tools on sidenav
  findByActive(): void {
    this.kToolsActive = this.kTools.filter((tool) => tool.isActive);
  }

  selectionChange(option: MatListOption): void {
    const selectedStatus = [];
    console.log(option);
    console.log(this.statusSelect);
    if (option.selected) {
      console.log('checked');
    }
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