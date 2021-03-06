import { Component, Inject, EventEmitter, Output, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import {
  MAT_DIALOG_DATA,
  MatDialogRef,
  MatDialog,
} from '@angular/material/dialog';

import { Ticket } from '../ticket.model';
import { TicketService } from '../ticket.service';
import { MessageService } from 'src/app/shared/message.service';

@Component({
  selector: 'app-ticket-form',
  templateUrl: './ticket-form.component.html',
  styleUrls: ['./ticket-form.component.scss'],
})
export class TicketFormComponent implements OnInit {
  @Output() cancel: EventEmitter<void> = new EventEmitter();
  @Output() submit: EventEmitter<Ticket> = new EventEmitter();

  formMode: string;
  ticketForm: FormGroup;
  serviceDeskTypes = [];
  mode = new FormControl('side');
  opened: boolean;
  fullScreen: boolean = false;
  ticketType: string;

  constructor(
    private ticketService: TicketService,
    private messageService: MessageService,
    private ticketBuilder: FormBuilder,
    public dialog: MatDialog,
    public dialogRef: MatDialogRef<TicketFormComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Ticket
  ) {
    this.ticketForm = this.ticketBuilder.group({
      id: [''],
      title: ['', Validators.required],
      description: ['', Validators.required],
      ticketNumber: [''],
      serviceDeskTypes: [''],
    });

  }

  ngOnInit(): void {

    if (this.data) {
      
      this.formMode = 'Mission System Registration ';
      this.ticketType = this.data.serviceDeskTypes;
      this.ticketForm.patchValue(this.data);
    } else {
      this.formMode = 'Create new Ticket';
    }
  }

  onCancel(): void {
    this.dialogRef.close(true);
    this.messageService.showMessage('Changes aborted');
  }

  onSubmit(data: FormGroup): void {
    const ticket = data.value;

    if (ticket.id) {
      this.ticketService.put(ticket).subscribe(
        () => {
          this.dialogRef.close(true);
          this.messageService.showMessage('Success: Ticket Updated');
        },
        () => {
          this.messageService.showError('Error: Failed to update');
        }
      );
    } else {
      ticket.id = (Math.random() * 1000).toString();
      this.ticketService.post(ticket).subscribe(
        () => {
          this.dialogRef.close(true);
          this.messageService.showMessage('Sucess: Ticket Created');
        },
        () => {
          this.messageService.showError('Error: Failed to create ticket');
        }
      );
    }
  }

  statColor(stat: string): string {
    const status = this.ticketService.getStatus(stat);
    return status.color;
  }

  fullScreenClick(): void {
    this.fullScreen = !this.fullScreen;
  }
}
