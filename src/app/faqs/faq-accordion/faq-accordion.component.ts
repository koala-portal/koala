import { Component, Input } from '@angular/core';
import { Faq } from '../faq.model';
import { FaqsService } from '../faqs.service';
import { MessageService } from 'src/app/shared/message.service';
import { MatDialogRef, MatDialog } from '@angular/material/dialog';
import { FaqFormDialogComponent } from '../faq-form-dialog/faq-form-dialog.component';
import { FaqCategory } from '../faq-category.model';

@Component({
  selector: 'app-faq-accordion',
  templateUrl: './faq-accordion.component.html',
  styleUrls: ['./faq-accordion.component.scss'],
})
export class FaqAccordionComponent {
  @Input() faqs: Faq[];

  @Input() selectedFaq: Faq;

  userIsAdmin = true;

  constructor(
    private faqsService: FaqsService,
    private messageService: MessageService,
    private dialog: MatDialog
  ) {}

  onClickStarFaq(faq: Faq): void {
    this.faqsService.starFaq(faq);
  }

  onClickDeleteFaq(faq: Faq): void {
    this.messageService
      .openConfirmDialog(
        'Delete FAQ',
        'Are you sure you want to delete this FAQ?'
      )
      .afterClosed()
      .subscribe((confirm) => {
        if (confirm) {
          this.faqsService.delete(faq);
        }
      });
  }

  onClickEditFaq(faq: Faq): void {
    this.openFaqFormDialog(faq);
  }

  openFaqFormDialog(
    faq?: Faq,
    faqCategory?: FaqCategory
  ): MatDialogRef<FaqFormDialogComponent, Faq> {
    return this.dialog.open(FaqFormDialogComponent, {
      disableClose: true,
      width: '500px',
      data: {
        faq,
        category: faqCategory,
      },
    });
  }
}
