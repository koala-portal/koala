import { Routes, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';

import { KToolsComponent } from './k-tools.component';
import { KToolResolver } from './k-tool.resolver';
import { UserGuideComponent } from './user-guide/user-guide.component';
import { SectionsListComponent } from './user-guide/sections-list/sections-list.component';
import { ReleaseNotesComponent } from './user-guide/release-notes/release-notes.component';
import { UserGuideResolver } from './user-guide/user-guide.resolver';

const routes: Routes = [
  {
    path: 'k-tools',
    component: KToolsComponent,
  },
  {
    path: 'k-tools/:id',
    component: UserGuideComponent,
    resolve: {
      kTool: KToolResolver,
    },
    children: [
      {
        path: '',
        pathMatch: 'full',
        redirectTo: 'user-guide',
      },
      {
        path: 'user-guide',
        component: SectionsListComponent,
        resolve: {
          userGuide: UserGuideResolver,
        },
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
    RouterModule.forRoot(routes, {
      useHash: false,
      anchorScrolling: 'enabled',
    }),
  ],
  exports: [RouterModule],
})
export class KToolsRoutingModule {}
