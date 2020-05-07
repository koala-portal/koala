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
  @Input() selectedFaqCategory: FaqCategory;

  @Input() selectedFaq: Faq;

  @Input() userIsAdmin = false;

  private clickedFaq: Faq;

  constructor(
    private faqsService: FaqsService,
    private messageService: MessageService,
    private dialog: MatDialog
  ) {}

  onFaqSelected(faq: Faq): void {
    if (!this.clickedFaq || this.clickedFaq.id !== faq.id) {
      this.clickedFaq = faq;
      this.faqsService.viewedFaq(faq).subscribe(
        ()=> {
          faq.timesViewed = faq.timesViewed + 1;
        },
        (error: any)=> {
          /* GULP */
        }
    );
    }    
  }

  onClickDeleteFaq(faq: Faq): void {
    this.messageService
      .openConfirmDialog(
        'Delete FAQ',
        'Are you sure you want to delete this FAQ?'
      )
      .subscribe((confirm) => {
        if (confirm) {
          this.faqsService.deleteFaq(faq).subscribe(
            ()=> {
              var index = this.faqs.indexOf(faq);
              if (index !== -1) this.faqs.splice(index, 1);
            },
            (error: any)=> {
              this.messageService.showErrorWithDetailsTst(error.error.error, error.error.resolution);
            }
    );
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
      panelClass: 'form-dialog',
      width: '500px',
      data: {
        faq,
        category: faqCategory,
      },
    });
  }
}
