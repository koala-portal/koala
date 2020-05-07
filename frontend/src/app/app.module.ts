import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { TicketsComponent } from './tickets/tickets.component';
import { TicketListComponent } from './tickets/ticket-list/ticket-list.component';
import { TicketItemComponent } from './tickets/ticket-item/ticket-item.component';
import { DropdownDirective } from './shared/dropdown.directive';
import { FaqsComponent } from './faqs/faqs.component';
import { FaqStarredComponent } from './faqs/faq-starred/faq-starred.component';
import { KoalaSearchComponent } from './koala-search/koala-search.component';
import { TicketFormComponent } from './tickets/ticket-form/ticket-form.component';
import { AbodeComponent } from './abode/abode.component';
import { FaqListComponent } from './faqs/faq-list/faq-list.component';
import { FaqCategoryFormDialogComponent } from './faqs/faq-category-form-dialog/faq-category-form-dialog.component';
import { FaqCategoryFormComponent } from './faqs/faq-category-form/faq-category-form.component';
import { FaqFormDialogComponent } from './faqs/faq-form-dialog/faq-form-dialog.component';
import { FaqFormComponent } from './faqs/faq-form/faq-form.component';
import { FaqAccordionComponent } from './faqs/faq-accordion/faq-accordion.component';
import { SharedModule } from './shared/shared.module';
import { UserGuideModule } from './user-guide/user-guide.module';
import { KToolsModule } from './k-tools/k-tools.module';
import { CoreModule } from './core.module';
import { ReleaseNotesModule } from './release-notes/release-notes.module';

import { ToastrModule } from 'ngx-toastr';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    TicketsComponent,
    TicketListComponent,
    TicketItemComponent,
    DropdownDirective,
    FaqsComponent,
    FaqStarredComponent,
    KoalaSearchComponent,
    TicketFormComponent,
    AbodeComponent,
    FaqListComponent,
    FaqCategoryFormComponent,
    FaqCategoryFormDialogComponent,
    FaqFormDialogComponent,
    FaqFormComponent,
    FaqAccordionComponent,
  ],
  imports: [
    CoreModule,
    SharedModule,
    UserGuideModule,
    KToolsModule,
    ReleaseNotesModule,
    ToastrModule.forRoot({
      timeOut: 5000,
      positionClass: 'toast-bottom-right',
      preventDuplicates: true,
      enableHtml: true,
      titleClass: 'toast-title',
      tapToDismiss: true,
    }), //This allows us to create a common/global config that all pop-ups will follow throughout the app.  Current options a developer can use are: success/error/warning/info/show.
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
