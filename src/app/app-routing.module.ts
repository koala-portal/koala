import { AbodeComponent } from './abode/abode.component';
import { TicketEditComponent } from './tickets/ticket-edit/ticket-edit.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { TicketsComponent } from './tickets/tickets.component';

import { TicketDetailComponent } from './tickets/ticket-detail/ticket-detail.component';
import { TicketStartComponent } from './tickets/ticket-start/ticket-start.component';
import { FaqsComponent } from './faqs/faqs.component';
import { KToolsComponent } from './k-tools/k-tools.component';
import { FaqEditComponent } from './faqs/faq-edit/faq-edit.component';
import { FaqListComponent } from './faqs/faq-list/faq-list.component';
import { CategoryEditComponent } from './faqs/category-edit/category-edit.component';

const appRoutes: Routes = [
  // { path: '', redirectTo: '', pathMatch: 'full' },
  { path: '', component: AbodeComponent },
  {
    path: 'tickets',
    component: TicketsComponent,
    children: [
      { path: '', component: TicketStartComponent },
      { path: 'new', component: TicketEditComponent },
      { path: ':id', component: TicketDetailComponent },
      { path: ':id/edit', component: TicketEditComponent },
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
        path: 'category/add',
        component: CategoryEditComponent,
      },
      {
        path: 'category/:categoryId/edit',
        component: CategoryEditComponent,
      },
      {
        path: 'category/:categoryId/faq/add',
        component: FaqEditComponent,
      },
      {
        path: 'category/:categoryId/faq/:faqId/edit',
        component: FaqEditComponent,
      },
    ],
  },
];
@NgModule({
  imports: [RouterModule.forRoot(appRoutes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
