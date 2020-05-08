import { Component, OnInit, OnDestroy, Output, EventEmitter } from '@angular/core';
import { Faq } from '../faq.model';
import { FaqCategory } from '../faq-category.model';
import { FaqsService } from '../faqs.service';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { MessageService } from 'src/app/shared/message.service';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { FaqFormDialogComponent } from '../faq-form-dialog/faq-form-dialog.component';
import { FaqCategoryFormDialogComponent } from '../faq-category-form-dialog/faq-category-form-dialog.component';
import { KToolsService } from '../../k-tools/k-tools.service';
import { User } from '../../k-tools/user.model';

@Component({
  selector: 'app-faqs-list',
  templateUrl: './faq-list.component.html',
  styleUrls: ['./faq-list.component.scss'],
})
export class FaqListComponent implements OnInit, OnDestroy {
  filterFaqCategory: FaqCategory;
  selectedFaq: Faq;

  faqCategories: FaqCategory[];
  faqs:Faq[]

  private paramsSub: Subscription;

  userIsAdmin = false;

  constructor(
    private faqsService: FaqsService,
    private messageService: MessageService,
    private route: ActivatedRoute,
    private dialog: MatDialog,
    private ktService: KToolsService
  ) {}

  ngOnInit(): void {
    //Get the user's role
    this.ktService.whoamiEmitter.subscribe((user:User) => {
      this.userIsAdmin = user.role == "ADMIN";
    });

    //Load the list of categories
    this.faqsService.loadFaqCategories().subscribe(
        (faqCats:FaqCategory[])=> {
          this.faqCategories = faqCats;
        },
        (error: any)=> {
          this.messageService.showErrorWithDetailsTst(  error.error.resolution,
                                                        error.error.error);
        },
        ()=> {
          //By default we want to load the Top Questions FAQs
          for (var x=0; x < this.faqCategories.length; x++)
            if (this.faqCategories[x].topQuestionsCategory)
              this.onClickCategory(this.faqCategories[x]);
        }
    );

    //Set up a listener for any time a new FAQ Category is created
    this.faqsService.saveFaqCategoriesEmitter.subscribe((faqCat:FaqCategory) => {
      this.faqCategories.push(faqCat);
    });

    //Set up a listener for any time an existing FAQ Category is modified
    this.faqsService.updateFaqCategoriesEmitter.subscribe((faqCat:FaqCategory) => {
      for (var x=0; x < this.faqCategories.length; x++) {
        if (this.faqCategories[x].id == faqCat.id) {
          this.faqCategories[x].title = faqCat.title;
          this.faqCategories[x].description = faqCat.description;
        }
      }
    });

    //Set up a listener for any time a new FAQ is created and put it at the top of the list
    this.faqsService.saveFaqEmitter.subscribe((faq:Faq) => {
      this.faqs.push(faq);
    });

    //Set up a listener for any time a FAQ is updated
    this.faqsService.updateFaqEmitter.subscribe((faq:Faq) => {
      for (var x=0; x < this.faqs.length; x++) {
        if (this.faqs[x].id == faq.id) {
          this.faqs[x].title = faq.title;
          this.faqs[x].description = faq.description;
          this.faqs[x].info = faq.info;
          this.faqs[x].category = faq.category;
        }
      }
    });

    // this.filterFaqCategory = this.faqCategories[0];
    this.paramsSub = this.route.params.subscribe((params) => {
      if (params.id) {
        //@TODO - RE-Enter this logic
      }
    });
  }

  ngOnDestroy(): void {
    this.paramsSub.unsubscribe();
  }

  onClickCategory(category: FaqCategory): void {
    this.filterFaqCategory = category;
    
    this.faqsService.loadFaqs(category.id).subscribe(
        (faqs:Faq[])=> {
          this.faqs = faqs;
        },
        (error: any)=> {
          this.messageService.showErrorWithDetailsTst(error.error.error, error.error.resolution);
        }
    );
  }

  onClickAddFaq(category: FaqCategory): void {
    this.openFaqFormDialog(null, category);
  }

  openFaqFormDialog(
    faq?: Faq,
    faqCategory?: FaqCategory
  ): MatDialogRef<FaqFormDialogComponent, Faq> {
    return this.dialog.open(FaqFormDialogComponent, {
      disableClose: true,
      width: '500px',
      panelClass: 'form-dialog',
      data: {
        faq,
        category: faqCategory,
      },
    });
  }

  onClickAddCategory(): void {
    this.openFaqCategoryFormDialog();
  }

  onClickEditCategory(category: FaqCategory): void {
    this.openFaqCategoryFormDialog(category);
  }

  onClickDeleteCategory(category: FaqCategory): void {
    this.messageService
      .openConfirmDialog(
        'Delete Category',
        'Are you sure you want to delete this Category?'
      )
      .subscribe((confirm) => {
        if (confirm) {
          this.faqsService.deleteFaqCategory(category).subscribe(
            ()=> {
            var index = this.faqCategories.indexOf(category);
            if (index !== -1) this.faqCategories.splice(index, 1);
            this.filterFaqCategory = null;
          },
          (error: any)=> {
            this.messageService.showErrorWithDetailsTst(error.error.error, error.error.resolution);
          }
    );;
        }
      });
  }

  onOpenFaq(faq: Faq): void {
    this.selectedFaq = faq;
  }

  openFaqCategoryFormDialog(faqCategory?: FaqCategory): MatDialogRef<FaqCategoryFormDialogComponent, FaqCategory> {
    return this.dialog.open(FaqCategoryFormDialogComponent, {
      disableClose: true,
      panelClass: 'form-dialog',
      width: '500px',
      data: faqCategory,
    });
  }
}
