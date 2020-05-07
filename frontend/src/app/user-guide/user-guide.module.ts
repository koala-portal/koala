import { NgModule } from '@angular/core';

import { SectionsListComponent } from './sections-list/sections-list.component';
import { SectionFormComponent } from './section-form/section-form.component';
import { SectionFormDialogComponent } from './section-form-dialog/section-form-dialog.component';
import { UserGuideComponent } from './user-guide.component';
import { SharedModule } from '../shared/shared.module';
import { KToolsModule } from '../k-tools/k-tools.module';
import { CoreModule } from '../core.module';

@NgModule({
  declarations: [
    SectionsListComponent,
    SectionFormComponent,
    SectionFormDialogComponent,
    UserGuideComponent,
  ],
  imports: [CoreModule, SharedModule, KToolsModule],
})
export class UserGuideModule {}
