import { NgModule } from '@angular/core';

import { SharedModule } from 'src/app/shared/shared.module';
import { SectionFormDialogComponent } from './section-form-dialog/section-form-dialog.component';
import { SectionFormComponent } from './section-form/section-form.component';
import { SectionsListComponent } from './sections-list/sections-list.component';
import { UserGuideComponent } from './user-guide.component';
import { CoreModule } from '../core.module';

@NgModule({
  declarations: [
    SectionsListComponent,
    SectionFormComponent,
    SectionFormDialogComponent,
    UserGuideComponent,
  ],
  imports: [CoreModule, SharedModule],
})
export class UserGuideModule {}
