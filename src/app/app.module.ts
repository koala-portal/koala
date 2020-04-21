import { AppRoutingModule } from './app-routing.module';
import { KToolsService } from './k-tools/k-tools.service';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { BrowserModule } from '@angular/platform-browser';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { AppComponent } from './app.component';
import { MaterialModule } from './shared/material.module';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { KToolsComponent } from './k-tools/k-tools.component';
import { TicketsComponent } from './tickets/tickets.component';
import { TicketListComponent } from './tickets/ticket-list/ticket-list.component';
import { TicketDetailComponent } from './tickets/ticket-detail/ticket-detail.component';
import { TicketItemComponent } from './tickets/ticket-list/ticket-item/ticket-item.component';
import { KToolEditComponent } from './k-tools/k-tool-edit/k-tool-edit.component';
import { DropdownDirective } from './shared/dropdown.directive';
import { FaqsComponent } from './faqs/faqs.component';
import { FaqItemComponent } from './faqs/faq-item/faq-item.component';
import { FaqTopTenComponent } from './faqs/faq-top-ten/faq-top-ten.component';
import { ServiceDeskComponent } from './service-desk/service-desk.component';
import { UserGuideComponent } from './user-guide/user-guide.component';
import { KoalaSearchComponent } from './koala-search/koala-search.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { TicketStartComponent } from './tickets/ticket-start/ticket-start.component';
import { TicketEditComponent } from './tickets/ticket-edit/ticket-edit.component';
import { AbodeComponent } from './abode/abode.component';
import { FaqEditComponent } from './faqs/faq-edit/faq-edit.component';
import { ServiceDeskListComponent } from './service-desk/service-desk-list/service-desk-list.component';
import { ServiceDeskEditComponent } from './service-desk/service-desk-edit/service-desk-edit.component';
import { FaqListComponent } from './faqs/faq-list/faq-list.component';
import { FaqCategoryFormDialogComponent } from './faqs/faq-category-form-dialog/faq-category-form-dialog.component';
import { FaqCategoryFormComponent } from './faqs/faq-category-form/faq-category-form.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    KToolsComponent,
    TicketsComponent,
    TicketListComponent,
    TicketDetailComponent,
    KToolEditComponent,
    TicketItemComponent,
    DropdownDirective,
    FaqsComponent,
    FaqItemComponent,
    FaqTopTenComponent,
    ServiceDeskComponent,
    UserGuideComponent,
    KoalaSearchComponent,
    TicketStartComponent,
    TicketEditComponent,
    AbodeComponent,
    FaqEditComponent,
    ServiceDeskListComponent,
    ServiceDeskEditComponent,
    FaqListComponent,
    FaqCategoryFormComponent,
    FaqCategoryFormDialogComponent,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    NgbModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MaterialModule,
  ],
  providers: [KToolsService],
  bootstrap: [AppComponent],
})
export class AppModule {}
