import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from 'src/app/app-routing.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialModule } from 'src/app/shared/material.module';
import { FlexLayoutModule } from '@angular/flex-layout';

import { ReleaseNotesComponent } from './release-notes/release-notes.component';
import { SectionsListComponent } from './sections-list/sections-list.component';
import { SectionFormComponent } from './section-form/section-form.component';
import { SectionFormDialogComponent } from './section-form-dialog/section-form-dialog.component';
import { UserGuideComponent } from './user-guide.component';
import { SharedModule } from 'src/app/shared/shared.module';

@NgModule({
  declarations: [
    ReleaseNotesComponent,
    SectionsListComponent,
    SectionFormComponent,
    SectionFormDialogComponent,
    UserGuideComponent,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MaterialModule,
    FlexLayoutModule,
    SharedModule,
  ],
})
export class UserGuideModule {}
