import { AbodeComponent } from './abode/abode.component';
import { TicketEditComponent } from './tickets/ticket-edit/ticket-edit.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { TicketsComponent } from './tickets/tickets.component';

import { TicketDetailComponent } from './tickets/ticket-detail/ticket-detail.component';
import { TicketListComponent } from './tickets/ticket-list/ticket-list.component';
import { FaqsComponent } from './faqs/faqs.component';
import { KToolsComponent } from './k-tools/k-tools.component';

const appRoutes: Routes = [
  // { path: '', redirectTo: '', pathMatch: 'full' },
  { path: '', component: AbodeComponent },
  {
    path: 'tickets',
    component: TicketsComponent,
    children: [
      { path: '', component: TicketListComponent},
      { path: 'new', component: TicketEditComponent },
      { path: ':ticketNumber', component: TicketDetailComponent },
      { path: ':ticketNumber/edit', component: TicketEditComponent },
    ],
  },
  { path: 'k-tools', component: KToolsComponent },
  { path: 'faqs', component: FaqsComponent },
];
@NgModule({
  imports: [RouterModule.forRoot(appRoutes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
