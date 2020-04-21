import { Component, Inject } from '@angular/core';
import { Faq } from '../faq.model';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { FaqsService } from '../faqs.service';
import { MessageService } from 'src/app/shared/message.service';

@Component({
  selector: 'app-faq-form-dialog',
  templateUrl: './faq-form-dialog.component.html',
  styleUrls: ['./faq-form-dialog.component.scss'],
})
export class FaqFormDialogComponent {
  constructor(
    private messageService: MessageService,
    private faqsService: FaqsService,
    public dialogRef: MatDialogRef<FaqFormDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Faq
  ) {}

  onSubmit(faq: Faq): void {
    if (faq.id) {
      this.faqsService.put(faq).subscribe(
        () => {
          this.dialogRef.close(true);
          this.messageService.showMessage('FAQ Updated');
        },
        () => {
          this.messageService.showError('Updating FAQ Failed');
        }
      );
    } else {
      faq.id = (Math.random() * 1000).toString();
      this.faqsService.post(faq).subscribe(
        () => {
          this.dialogRef.close(true);
          this.messageService.showMessage('FAQ Saved');
        },
        () => {
          this.messageService.showError('Creating FAQ Failed');
        }
      );
    }
  }

  onCancel(): void {
    this.dialogRef.close(false);
  }
}
