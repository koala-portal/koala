import { TicketListComponent } from './tickets/ticket-list/ticket-list.component';
import { AbodeComponent } from './abode/abode.component';
import { TicketFormComponent } from './tickets/ticket-form/ticket-form.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { TicketsComponent } from './tickets/tickets.component';

import { TicketItemComponent } from './tickets/ticket-item/ticket-item.component';
import { FaqsComponent } from './faqs/faqs.component';
import { KToolsComponent } from './k-tools/k-tools.component';
import { FaqListComponent } from './faqs/faq-list/faq-list.component';
import { UserGuideComponent } from './user-guide/user-guide.component';

const appRoutes: Routes = [
  // { path: '', redirectTo: '', pathMatch: 'full' },
  { path: '', component: AbodeComponent },
  {
    path: 'tickets',
    component: TicketsComponent,
    children: [
      { path: '', component: TicketListComponent },
      { path: 'new', component: TicketFormComponent },
      { path: ':id', component: TicketItemComponent },
      { path: ':id/edit', component: TicketFormComponent },
    ],
  },
  { path: 'k-tools', component: KToolsComponent },
  {
    path: 'faqs',
    component: FaqsComponent,
    children: [
      {
        path: '',
        pathMatch: 'full',
        component: FaqListComponent,
      },
      {
        path: ':id',
        component: FaqListComponent,
      },
    ],
  },
  {
    path: 'guides/:id',
    component: UserGuideComponent,
  },
];
@NgModule({
  imports: [RouterModule.forRoot(appRoutes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}