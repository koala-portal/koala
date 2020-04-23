import {
  Component,
  Input,
  Inject,
  EventEmitter,
  Output,
  OnInit,
} from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
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
  // ticket: Ticket;
  // id: number;
  // ticketNumber: string;

  // @Input() data: Ticket;

  @Output() cancel: EventEmitter<void> = new EventEmitter();
  @Output() submit: EventEmitter<Ticket> = new EventEmitter();

  editMode = false; // assume its a new ticket
  ticketForm = this.ticketBuilder.group({
    id: [''],
    title: ['', Validators.required],
    description: ['', Validators.required],
  });

  constructor(
    private ticketService: TicketService,
    private route: ActivatedRoute,
    private router: Router,
    private messageService: MessageService,
    private ticketBuilder: FormBuilder,
    public dialog: MatDialog,
    public dialogRef: MatDialogRef<TicketFormComponent>,

    @Inject(MAT_DIALOG_DATA) public data: { ticket: Ticket }
  ) {}

  ngOnInit(): void {
    // TODO: add ktool values
    // pass var for new/edit?
    if (this.data) {
      this.ticketForm.patchValue(this.data);
    }
  }

  onSubmit(form: FormGroup): void {
    this.submit.emit(form.value);
    this.messageService.showMessage('Ticket saved');
  }

  onCancel(): void {
    this.dialogRef.close(true);
    this.messageService.showMessage('Changes aborted');
  }

  // onSubmit(ticket: Ticket): void {
  //   if (ticket.id) {
  //     this.faqsService.put(ticket).subscribe(
  //       () => {
  //         this.dialogRef.close(true);
  //         this.messageService.showMessage('FAQ Updated');
  //       },
  //       () => {
  //         this.messageService.showError('Updating FAQ Failed');
  //       }
  //     );
  //   } else {
  //     faq.id = (Math.random() * 1000).toString();
  //     this.faqsService.post(faq).subscribe(
  //       () => {
  //         this.dialogRef.close(true);
  //         this.messageService.showMessage('FAQ Saved');
  //       },
  //       () => {
  //         this.messageService.showError('Creating FAQ Failed');
  //       }
  //     );
  //   }
  // }
}
