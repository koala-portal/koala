import { Component, Inject, EventEmitter, Output } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import {
  MAT_DIALOG_DATA,
  MatDialogRef,
  MatDialog,
} from '@angular/material/dialog';
import { Ticket } from '../ticket.model';
import { TicketService } from '../ticket.service';
import { MessageService } from 'src/app/shared/message.service';
import { TicketEditComponent } from '../ticket-edit/ticket-edit.component';

@Component({
  selector: 'app-ticket-detail',
  templateUrl: './ticket-detail.component.html',
  styleUrls: ['./ticket-detail.component.scss'],
})
export class TicketDetailComponent {
  ticket: Ticket;
  id: number;
  ticketNumber: string;
  @Output() cancel: EventEmitter<void> = new EventEmitter();

  constructor(
    private ticketService: TicketService,
    private route: ActivatedRoute,
    private router: Router,
    private messageService: MessageService,
    public dialog: MatDialog,
    public dialogRef: MatDialogRef<TicketDetailComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Ticket
  ) {}

  editTicket(): void {
    this.dialogRef.close(true);
    this.openDialog();
  }

  openDialog(data?: Ticket): MatDialogRef<TicketEditComponent, Ticket> {
    return this.dialog.open(TicketEditComponent, {
      disableClose: true,
      width: '800px',
      minHeight: '500px',
      data: data,
    });
  }

  closeDialog(): void {
    this.dialogRef.close(true);
  }
}
