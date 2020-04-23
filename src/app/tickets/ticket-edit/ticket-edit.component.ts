import { MatDialogModule } from '@angular/material/dialog';
import { Component, Inject } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Ticket } from '../ticket.model';

@Component({
  selector: 'app-ticket-edit',
  templateUrl: './ticket-edit.component.html',
  styleUrls: ['./ticket-edit.component.scss'],
})
export class TicketEditComponent {
  id: number;
  editMode = false; // assume its a new ticket
  constructor(
    private route: ActivatedRoute,
    public dialogRef: MatDialogRef<TicketEditComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Ticket
  ) {}

  closeDialog(): void {
    this.dialogRef.close(true);
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

  onCancel(): void {
    this.dialogRef.close(false);
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
