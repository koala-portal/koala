import { NgModule } from '@angular/core';

import { ReleaseNotesComponent } from './release-notes/release-notes.component';
import { SectionsListComponent } from './sections-list/sections-list.component';
import { SectionFormComponent } from './section-form/section-form.component';
import { SectionFormDialogComponent } from './section-form-dialog/section-form-dialog.component';
import { UserGuideComponent } from './user-guide.component';
import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { MaterialModule } from '../shared/material.module';
import { AppRoutingModule } from '../app-routing.module';
import { SharedModule } from '../shared/shared.module';
import { FlexLayoutModule } from '@angular/flex-layout';
import { KToolsModule } from '../k-tools/k-tools.module';

@NgModule({
  declarations: [
    ReleaseNotesComponent,
    SectionsListComponent,
    SectionFormComponent,
    SectionFormDialogComponent,
    UserGuideComponent,
  ],
  imports: [
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule,
    MaterialModule,
    BrowserModule,
    SharedModule,
    FlexLayoutModule,
    KToolsModule,
  ],
})
export class UserGuideModule {}
