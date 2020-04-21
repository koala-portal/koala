import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { FaqCategory } from '../faq-category.model';
import { FaqsService } from '../faqs.service';
import { MessageService } from 'src/app/shared/message.service';

@Component({
  selector: 'app-faq-category-form-dialog',
  templateUrl: './faq-category-form-dialog.component.html',
  styleUrls: ['./faq-category-form-dialog.component.scss'],
})
export class FaqCategoryFormDialogComponent {
  constructor(
    private messageService: MessageService,
    private faqsService: FaqsService,
    public dialogRef: MatDialogRef<FaqCategoryFormDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: FaqCategory
  ) {}

  onSubmit(faqCategory: FaqCategory): void {
    if (faqCategory.id) {
      this.faqsService.putFaqCategory(faqCategory).subscribe(
        () => {
          this.dialogRef.close(true);
          this.messageService.showMessage('FAQ Category Updated');
        },
        () => {
          this.messageService.showError('Updating FAQ Category Failed');
        }
      );
    } else {
      faqCategory.id = (Math.random() * 1000).toString(); // placeholder for mongo id gen
      this.faqsService.postFaqCategory(faqCategory).subscribe(
        () => {
          this.dialogRef.close(true);
          this.messageService.showMessage('FAQ Category Saved');
        },
        () => {
          this.messageService.showError('Creating FAQ Category Failed');
        }
      );
    }
  }

  onCancel(): void {
    this.dialogRef.close(false);
  }
}
