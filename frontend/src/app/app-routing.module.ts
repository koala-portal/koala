import { TicketListComponent } from './tickets/ticket-list/ticket-list.component';
import { AbodeComponent } from './abode/abode.component';
import { TicketFormComponent } from './tickets/ticket-form/ticket-form.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { TicketsComponent } from './tickets/tickets.component';

import { TicketItemComponent } from './tickets/ticket-item/ticket-item.component';
import { FaqsComponent } from './faqs/faqs.component';
import { FaqListComponent } from './faqs/faq-list/faq-list.component';

import { UamFormComponent } from './uam-form/uam-form.component';
import { UamFormListComponent } from './uam-form/uam-form-list/uam-form-list.component';



const appRoutes: Routes = [
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
  },{
    path: 'uam-forms',
    component: UamFormComponent,
    children: [{
        path: '',
        pathMatch: 'full',
        component: UamFormListComponent,
      }]
  }
];
@NgModule({
  imports: [
    RouterModule.forRoot(appRoutes, {
      useHash: false,
      anchorScrolling: 'enabled',
    }),
  ],
  exports: [RouterModule],
})
export class AppRoutingModule {}
