import { NgModule } from '@angular/core';
import { ReleaseNotesComponent } from './release-notes.component';
import { CoreModule } from '../core.module';
import { SharedModule } from '../shared/shared.module';
import { ReleaseNotesFormComponent } from './release-notes-form/release-notes-form.component';
import { ReleaseNotesFormDialogComponent } from './release-notes-form-dialog/release-notes-form-dialog.component';

@NgModule({
  declarations: [
    ReleaseNotesComponent,
    ReleaseNotesFormComponent,
    ReleaseNotesFormDialogComponent,
  ],
  imports: [CoreModule, SharedModule],
  exports: [],
})
export class ReleaseNotesModule {}
