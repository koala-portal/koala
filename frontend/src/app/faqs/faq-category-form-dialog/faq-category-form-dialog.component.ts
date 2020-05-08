import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { FaqCategory } from '../faq-category.model';
import { FaqsService } from '../faqs.service';
import { MessageService } from 'src/app/shared/message.service';
import { ToastrService } from 'ngx-toastr';
import { HttpEmitAction } from '../../shared/http-emit-action.model';

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
    @Inject(MAT_DIALOG_DATA) public data: FaqCategory,
    private toastr: ToastrService
  ) {}

  onSubmit(faqCategory: FaqCategory): void {
    if (faqCategory.id) {
      var httpResp = this.faqsService.updateFaqCategory(faqCategory);
      httpResp.obser.subscribe(
        () => {
          this.dialogRef.close(true);
          this.messageService.showMessage('FAQ Category Updated');
          httpResp.emit.emit(faqCategory);
        },
        (error: any) => {
          this.messageService.showErrorWithDetailsTst(error.error.error, error.error.resolution);
        }
      );
    } else {
      var httpResp = this.faqsService.saveFaqCategory(faqCategory);
      httpResp.obser.subscribe(
        (faqCat:FaqCategory) => {
          this.dialogRef.close(true);
          this.messageService.showMessage('FAQ Category Saved');
          httpResp.emit.emit(faqCat);
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
