import { NgModule } from '@angular/core';
import { KToolsComponent } from './k-tools.component';
import { KToolItemComponent } from './k-tool-item/k-tool-item.component';
import { KToolFormComponent } from './k-tool-form/k-tool-form.component';
import { KToolFormDialogComponent } from './k-tool-form-dialog/k-tool-form-dialog.component';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from '../app-routing.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialModule } from '../shared/material.module';
import { FlexLayoutModule } from '@angular/flex-layout';
import { SharedModule } from '../shared/shared.module';

@NgModule({
  declarations: [
    KToolsComponent,
    KToolItemComponent,
    KToolFormComponent,
    KToolFormDialogComponent,
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
  exports: [KToolItemComponent],
})
export class KToolsModule {}
