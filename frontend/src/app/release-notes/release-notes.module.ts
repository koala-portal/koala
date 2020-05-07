import { NgModule } from '@angular/core';
import { ReleaseNotesComponent } from './release-notes.component';
import { CoreModule } from '../core.module';
import { SharedModule } from '../shared/shared.module';
import { MaterialModule } from '../material.module';

@NgModule({
  declarations: [ReleaseNotesComponent],
  imports: [CoreModule, SharedModule, MaterialModule],
  exports: [],
})
export class ReleaseNotesModule {}
