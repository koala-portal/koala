import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { Injector, NgModule } from '@angular/core';

import { ToastrModule } from 'ngx-toastr';

import { AgGridModule } from 'ag-grid-angular';
import 'ag-grid-enterprise';

import { AbodeComponent } from './abode/abode.component';
import { AppComponent } from './app.component';
import { FaqAccordionComponent } from './faqs/faq-accordion/faq-accordion.component';
import { FaqCategoryFormDialogComponent } from './faqs/faq-category-form-dialog/faq-category-form-dialog.component';
import { FaqCategoryFormComponent } from './faqs/faq-category-form/faq-category-form.component';
import { FaqFormDialogComponent } from './faqs/faq-form-dialog/faq-form-dialog.component';
import { FaqFormComponent } from './faqs/faq-form/faq-form.component';
import { FaqListComponent } from './faqs/faq-list/faq-list.component';
import { FaqStarredComponent } from './faqs/faq-starred/faq-starred.component';
import { FaqsComponent } from './faqs/faqs.component';
import { FooterComponent } from './footer/footer.component';
import { HeaderComponent } from './header/header.component';
import { HttpSecurityInterceptor } from './http-security.interceptor';
import { KToolsModule } from './k-tools/k-tools.module';
import { KoalaSearchComponent } from './koala-search/koala-search.component';
import { ServiceLocator } from './locator.service';
import { ReleaseNotesModule } from './release-notes/release-notes.module';
import { DropdownDirective } from './shared/dropdown.directive';
import { SharedModule } from './shared/shared.module';
import { TicketFormComponent } from './tickets/ticket-form/ticket-form.component';
import { TicketItemComponent } from './tickets/ticket-item/ticket-item.component';
import { TicketListComponent } from './tickets/ticket-list/ticket-list.component';
import { TicketsComponent } from './tickets/tickets.component';
import { CoreModule } from './core.module';
import { UamFormComponent } from './uam-form/uam-form.component';
import { UamFormListComponent } from './uam-form/uam-form-list/uam-form-list.component';
import { NewUamFormComponent } from './uam-form/new-uam-form/new-uam-form.component';
import { NewUamFormDialogComponent } from './uam-form/new-uam-form-dialog/new-uam-form-dialog.component';


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
    UamFormComponent,
    UamFormListComponent,
    NewUamFormComponent,
    NewUamFormDialogComponent
  ],
  imports: [
    CoreModule,
    SharedModule,
    KToolsModule,
    ReleaseNotesModule,
    AgGridModule.withComponents([]),
    ToastrModule.forRoot({
      timeOut: 5000,
      positionClass: 'toast-bottom-right',
      preventDuplicates: true,
      enableHtml: true,
      titleClass: 'toast-title',
      tapToDismiss: true,
    }), //This allows us to create a common/global config that all pop-ups will follow throughout the app.  Current options a developer can use are: success/error/warning/info/show.
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: HttpSecurityInterceptor,
      multi: true,
    },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {
  constructor(private injector: Injector) {
    ServiceLocator.injector = injector;
  }
}
