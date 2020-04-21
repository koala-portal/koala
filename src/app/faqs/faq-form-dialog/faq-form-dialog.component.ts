import { Component, Inject } from '@angular/core';
import { Faq } from '../faq.model';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { FaqsService } from '../faqs.service';

@Component({
  selector: 'app-faq-form-dialog',
  templateUrl: './faq-form-dialog.component.html',
  styleUrls: ['./faq-form-dialog.component.scss'],
})
export class FaqFormDialogComponent {
  constructor(
    private faqsService: FaqsService,
    public dialogRef: MatDialogRef<FaqFormDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Faq,
    private snackBar: MatSnackBar
  ) {}

  onSubmit(faq: Faq): void {
    if (faq.id) {
      this.faqsService.put(faq).subscribe(
        () => {
          this.dialogRef.close(true);
          this.showMessage('FAQ Updated');
        },
        () => {
          this.showError('Updating FAQ Failed');
        }
      );
    } else {
      faq.id = (Math.random() * 1000).toString();
      this.faqsService.post(faq).subscribe(
        () => {
          this.dialogRef.close(true);
          this.showMessage('FAQ Saved');
        },
        () => {
          this.showError('Creating FAQ Failed');
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
