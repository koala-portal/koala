import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { FaqCategory } from '../faq-category.model';
import { FaqsService } from '../faqs.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-faq-category-form-dialog',
  templateUrl: './faq-category-form-dialog.component.html',
  styleUrls: ['./faq-category-form-dialog.component.scss'],
})
export class FaqCategoryFormDialogComponent {
  constructor(
    private faqsService: FaqsService,
    public dialogRef: MatDialogRef<FaqCategoryFormDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: FaqCategory,
    private snackBar: MatSnackBar
  ) {}

  onSubmit(faqCategory: FaqCategory): void {
    if (faqCategory.id) {
      this.faqsService.putFaqCategory(faqCategory).subscribe(
        () => {
          this.dialogRef.close(true);
          this.showMessage('FAQ Category Updated');
        },
        () => {
          this.showError('Updating FAQ Category Failed');
        }
      );
    } else {
      faqCategory.id = (Math.random() * 1000).toString();
      this.faqsService.postFaqCategory(faqCategory).subscribe(
        () => {
          this.dialogRef.close(true);
          this.showMessage('FAQ Category Saved');
        },
        () => {
          this.showError('Creating FAQ Category Failed');
        }
      );
    }
  }

  showError(message) {
    return this.snackBar.open(message, 'Okay', {
      duration: 4000,
    });
  }

  showMessage(message) {
    return this.snackBar.open(message, 'Okay', {
      duration: 4000,
    });
  }
}
