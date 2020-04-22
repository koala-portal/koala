import { MatDialogModule } from '@angular/material/dialog';
import { Component, OnInit, Inject } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Ticket } from '../ticket.model';

@Component({
  selector: 'app-ticket-edit',
  templateUrl: './ticket-edit.component.html',
  styleUrls: ['./ticket-edit.component.scss'],
})
export class TicketEditComponent implements OnInit {
  id: number;
  editMode = false; // assume its a new ticket
  constructor(
    private route: ActivatedRoute,
    public dialogRef: MatDialogRef<TicketEditComponent>,
    @Inject(MAT_DIALOG_DATA) data
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe((params: Params) => {
      this.id = +params['id'];
      this.editMode = params['id'] != null;
    });
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
}
