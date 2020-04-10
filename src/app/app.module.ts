import { KToolsService } from './k-tools/k-tools.service';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { AppComponent } from './app.component';
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
  ],
  imports: [BrowserModule, FormsModule, HttpClientModule, NgbModule],
  providers: [KToolsService],
  bootstrap: [AppComponent],
})
export class AppModule {}
