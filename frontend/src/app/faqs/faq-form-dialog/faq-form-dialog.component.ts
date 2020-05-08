import { Component, Inject } from '@angular/core';
import { Faq } from '../faq.model';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { FaqsService } from '../faqs.service';
import { MessageService } from 'src/app/shared/message.service';
import { FaqCategory } from '../faq-category.model';

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
    @Inject(MAT_DIALOG_DATA) public data: { category: FaqCategory; faq: Faq }
  ) {}

  onSubmit(faq: Faq): void {
    if (faq.id) {
      var httpResp = this.faqsService.updateFaq(faq);
      httpResp.obser.subscribe(
        () => {
          this.dialogRef.close(true);
          this.messageService.showMessage('FAQ Updated');
          httpResp.emit.emit(faq);
        },
        (error: any) => {
          this.messageService.showErrorWithDetailsTst(error.error.error, error.error.resolution);
        }
      );
    } else {
      var httpResp = this.faqsService.saveFaq(faq);
      httpResp.obser.subscribe(
        (faq:Faq) => {
          this.dialogRef.close(true);
          this.messageService.showMessage('FAQ Saved');
          httpResp.emit.emit(faq);
        },
        (error: any) => {
          this.messageService.showErrorWithDetailsTst(error.error.error, error.error.resolution);
        }
      );
    }
  }

  onCancel(): void {
    this.dialogRef.close(false);
  }
}
