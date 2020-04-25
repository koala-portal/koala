import { AbodeComponent } from './abode/abode.component';
import { TicketEditComponent } from './tickets/ticket-edit/ticket-edit.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { TicketsComponent } from './tickets/tickets.component';

import { TicketDetailComponent } from './tickets/ticket-detail/ticket-detail.component';
import { TicketStartComponent } from './tickets/ticket-start/ticket-start.component';
import { FaqsComponent } from './faqs/faqs.component';
import { KToolsComponent } from './k-tools/k-tools.component';
import { FaqListComponent } from './faqs/faq-list/faq-list.component';
import { UserGuideComponent } from './user-guide/user-guide.component';
import { ReleaseNotesComponent } from './user-guide/release-notes/release-notes.component';
import { SectionsListComponent } from './user-guide/sections-list/sections-list.component';

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
        path: ':id',
        component: FaqListComponent,
      },
    ],
  },
  {
    path: 'guides/:id',
    component: UserGuideComponent,
    children: [
      {
        path: '',
        pathMatch: 'full',
        redirectTo: 'content',
      },
      {
        path: 'content',
        component: SectionsListComponent,
      },
      {
        path: 'release-notes',
        component: ReleaseNotesComponent,
      },
    ],
  },
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
